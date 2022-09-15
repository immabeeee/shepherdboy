import { Injectable } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Raw, Repository } from 'typeorm';
import {
  CreateAdditiveRequest,
  FindAdditiveListResponse,
  FindAdditiveResponse,
  UpdateAdditiveResponse,
} from '@shepherdboy-org/api-interfaces';
import { AdditiveEntity } from '../model/dto/extra/additive.entity';
import { CreateAdditiveDTO } from '../model/dto/extra/create-additive.dto.model';
import { UpdateAdditiveDTO } from '../model/dto/extra/update-additive.dto.model';
import { FindAdditiveListDTO } from '../model/dto/extra/find-additive-list.dto.model';

@Injectable()
export class AdditiveInventoryService {
  constructor(
    @InjectRepository(AdditiveEntity)
    private readonly additiveRepository: Repository<AdditiveEntity>
  ) {}

  createItem(req: CreateAdditiveDTO): Observable<CreateAdditiveRequest> {
    return from(this.additiveRepository.save(req));
  }

  findItem(id: string): Observable<FindAdditiveResponse> {
    return from(
      this.additiveRepository.findOne({
        where: [{ id: id }],
        select: [
          'availableAmount',
          'createdAt',
          'updatedAt',
          'group',
          'id',
          'name',
          'price',
        ],
      })
    );
  }

  deleteItem(id: string): Observable<DeleteResult> {
    return from(this.additiveRepository.delete(id));
  }

  updateItem(
    id: string,
    req: UpdateAdditiveDTO
  ): Observable<UpdateAdditiveResponse> {
    return from(this.additiveRepository.update(id, req)).pipe(
      switchMap(() => {
        return from(
          this.additiveRepository.findOne({
            where: [{ id: id }],
          })
        );
      })
    );
  }

  findList(req: FindAdditiveListDTO): Observable<FindAdditiveListResponse> {
    const { pageNumber, pageSize, filters, sort } = req;
    const skip = pageNumber * pageSize;

    const whereQuery =
      filters &&
      filters.length > 0 &&
      filters.map((filter) => {
        return {
          [`${filter.name}`]: Raw(
            (alias) => `LOWER(${alias}) Like '%${filter.value.toLowerCase()}%'`
          ),
        };
      });

    const orderQuery =
      sort && sort.orderBy && sort.sortBy
        ? { [`${sort.orderBy}`]: sort.sortBy }
        : {};

    return from(
      this.additiveRepository.find({
        where: whereQuery,
        order: orderQuery,
        take: pageSize,
        skip: skip,
      })
    ).pipe(
      map((additiveEntity: AdditiveEntity[]) => {
        return {
          items: additiveEntity,
          pageNumber,
          pageSize,
          filters,
          sort,
        };
      })
    );
  }
}
