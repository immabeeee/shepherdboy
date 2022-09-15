import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateOrderResponse,
  CreateOscypekResponse,
  FindOrderListResponse,
} from '@shepherdboy-org/api-interfaces';
import { Observable } from 'rxjs';
import { CreateOrderDTO } from '../model/dto/create-order-dto.model';
import { FindOrderListDTO } from '../model/dto/find-order-list-dto.model';
import { OrderService } from '../service/order.service';

@Controller('order')
export class OrderController {
  private readonly apiName = '[ORDER API]';

  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() body: CreateOrderDTO): Observable<CreateOrderResponse> {
    return this.orderService.createOrder(body);
  }

  @Post('list')
  find(
    @Body() body: FindOrderListDTO
  ): Promise<Observable<FindOrderListResponse>> {
    return this.orderService.findList(body);
  }

  @Get(':id')
  findOrderItems(@Param('id') id: string): Observable<any> {
    return this.orderService.findOrderItems(id);
  }
}
