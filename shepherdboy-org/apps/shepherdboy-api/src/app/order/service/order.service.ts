import { Injectable } from '@nestjs/common';
import { from, map, merge, Observable, of, switchMap, tap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { OrderEntity } from '../model/order.entity';
import {
  Additive,
  CreateOrderResponse,
  FindOrderListResponse,
  ORDER_STATUS,
  Oscypek,
  UpdateAdditiveResponse,
  UpdateOscypekResponse,
} from '@shepherdboy-org/api-interfaces';
import { OrderItemEntity } from '../model/order-item.entity';
import { OscypekInventoryService } from '../../inventory/service/oscypek-inventory.service';
import { AdditiveInventoryService } from '../../inventory/service/additive-inventory.service';
import { OrderItemAdditiveEntity } from '../model/order-item-additive.entity';
import { FindOrderListDTO } from '../model/dto/find-order-list-dto.model';
import { ShippingDetailsEntity } from '../model/shipping-details.entity';
import { CreateOrderDTO } from '../model/dto/create-order-dto.model';
import { ShippingDetailsDTO } from '../model/dto/shipping-details-dto.model';
import { OrderItemDTO } from '../model/dto/order-item-dto.model';
import { OrderItemAdditiveDetailsDTO } from '../model/dto/order-item-additive-details-dto.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ShippingDetailsEntity)
    private readonly shippingDetailsRepository: Repository<ShippingDetailsEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(OrderItemAdditiveEntity)
    private readonly orderItemAdditiveRepository: Repository<OrderItemAdditiveEntity>,
    private readonly oscypekInventoryService: OscypekInventoryService,
    private readonly additiveInventoryService: AdditiveInventoryService
  ) {}

  async findList(
    req: FindOrderListDTO
  ): Promise<Observable<FindOrderListResponse>> {
    const { pageNumber, pageSize, filters, sort } = req;
    const skip = pageNumber * pageSize;
    const cityFilter = req.filters.find((e) => e.name === 'city');
    const oscypekTypeFilter = req.filters.find((e) => e.name === 'type');
    const oscypekSizeFilter = req.filters.find((e) => e.name === 'size');

    const orderQuery =
      sort && sort.orderBy && sort.sortBy
        ? { [`${sort.sortBy}`]: sort.orderBy }
        : {};

    return from(
      this.orderRepository.findAndCount({
        relations: ['items', 'items.orderItemAdditives', 'shippingDetails'],
        where: {
          [`shippingDetails`]: {
            city: Raw(
              (alias) =>
                `LOWER(${alias}) Like '%${
                  cityFilter && cityFilter.value
                    ? cityFilter.value.toLowerCase()
                    : ''
                }%'`
            ),
          },
          [`items`]: {
            type: oscypekTypeFilter ? oscypekTypeFilter.value : null,
            size: oscypekSizeFilter ? oscypekSizeFilter.value : null,
          },
        },
        order: orderQuery,
        take: pageSize,
        skip: skip,
      })
    ).pipe(
      map(([orderEntities, count]: [OrderEntity[], number]) => {
        const totalPages = Math.ceil(count / pageSize);
        return {
          items: orderEntities,
          pageNumber,
          pageSize,
          filters,
          sort,
          totalElements: count,
          totalPages: totalPages,
        };
      })
    );
  }

  public findOrderItems(id: string): Observable<any> {
    return from(
      this.orderItemRepository.find({
        relations: ['orderItemAdditives'],
        where: [{ orderId: id }],
      })
    );
  }

  public createOrder(req: CreateOrderDTO): Observable<CreateOrderResponse> {
    return this.saveOrder().pipe(
      switchMap((orderEntity: OrderEntity) =>
        this.saveOrderShippingDetails(req.shippingDetails, orderEntity.id).pipe(
          switchMap((orderShippingDetails: ShippingDetailsEntity) =>
            this.saveOrderItems(req.items, orderEntity.id).pipe(
              map((e) => {
                return {
                  order: {
                    id: orderEntity.id,
                    createdAt: orderEntity.createdAt,
                    updatedAt: orderEntity.updatedAt,
                    status: orderEntity.status,
                    shippingDetails: orderShippingDetails,
                    items: [e],
                  },
                };
              })
            )
          )
        )
      )
    );
  }

  private saveOrder(): Observable<OrderEntity> {
    return from(
      this.orderRepository.save({
        status: ORDER_STATUS.NEW,
      })
    );
  }

  private saveOrderShippingDetails(
    shippingDetails: ShippingDetailsDTO,
    orderId: string
  ): Observable<ShippingDetailsEntity> {
    return from(
      this.shippingDetailsRepository.save({
        ...shippingDetails,
        orderId,
      })
    );
  }

  private saveOrderItems(
    items: OrderItemDTO[],
    orderId: string
  ): Observable<OrderItemEntity> {
    return merge(
      ...items.map((item) => {
        return from(
          this.oscypekInventoryService.findItem(item.oscypek.id)
        ).pipe(
          switchMap((oscypek) => {
            return this.saveOrderItem(
              oscypek,
              item.oscypek.quantity,
              orderId
            ).pipe(
              switchMap((orderItem) => {
                return this.saveOrderItemAddivites(
                  item.additives,
                  orderItem.id,
                  orderId
                );
              })
            );
          })
        );
      })
    );
  }

  private saveOrderItem(
    item: Oscypek,
    quantity: number,
    orderId: string
  ): Observable<OrderItemEntity> {
    return from(
      this.orderItemRepository.save({
        name: item.name,
        group: item.group,
        price: item.price,
        quantity: quantity,
        orderId: orderId,
        type: item.type,
        size: item.size,
      })
    ).pipe(
      switchMap((orderItemEntity) => {
        return this.updateOscypekAvailableAmount(item, quantity).pipe(() =>
          of(orderItemEntity)
        );
      })
    );
  }

  private updateOscypekAvailableAmount(
    oscypek: Oscypek,
    quantity: number
  ): Observable<UpdateOscypekResponse> {
    const newAvailableAmount = oscypek.availableAmount - quantity;
    return from(
      this.oscypekInventoryService.updateItem(oscypek.id, {
        ...oscypek,
        availableAmount: newAvailableAmount,
      })
    );
  }

  private saveOrderItemAddivites(
    additives: OrderItemAdditiveDetailsDTO[],
    orderItemId: string,
    orderId: string
  ): Observable<any> {
    return merge(
      ...additives.map(({ id, quantity }) => {
        return from(this.additiveInventoryService.findItem(id)).pipe(
          switchMap((additive) => {
            return this.saveOrderItemAddivite(
              additive,
              quantity,
              orderItemId,
              orderId
            );
          })
        );
      })
    );
  }

  private saveOrderItemAddivite(
    additive: Additive,
    quantity: number,
    orderItemId: string,
    orderId: string
  ): Observable<UpdateAdditiveResponse> {
    return from(
      this.orderItemAdditiveRepository.save({
        name: additive.name,
        group: additive.group,
        price: additive.price,
        quantity: quantity,
        orderId: orderId,
        orderItemId: orderItemId,
      })
    ).pipe(
      switchMap((e) => {
        return this.updateAdditiveAvailableAmount(additive, quantity).pipe(() =>
          of(e)
        );
      })
    );
  }

  private updateAdditiveAvailableAmount(
    additive: Additive,
    quantity: number
  ): Observable<UpdateAdditiveResponse> {
    const newAvailableAmount = additive.availableAmount - quantity;
    return from(
      this.additiveInventoryService.updateItem(additive.id, {
        ...additive,
        availableAmount: newAvailableAmount,
      })
    );
  }
}
