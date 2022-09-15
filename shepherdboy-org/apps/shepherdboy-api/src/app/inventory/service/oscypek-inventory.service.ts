import { Injectable } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Raw, Repository } from 'typeorm';
import { OscypekEntity } from '../model/dto/oscypek/oscypek.entity';
import {
  CreateOscypekRequest,
  FindOscypekListResponse,
  Oscypek,
  UpdateOscypekResponse,
} from '@shepherdboy-org/api-interfaces';
import { CreateOscypekDTO } from '../model/dto/oscypek/create-oscypek.dto.model';
import { UpdateOscypekDTO } from '../model/dto/oscypek/update-oscypek.dto.model';
import { FindOscypekListDTO } from '../model/dto/oscypek/find-oscypek-list-dto.model';

@Injectable()
export class OscypekInventoryService {
  constructor(
    @InjectRepository(OscypekEntity)
    private readonly oscypekRepository: Repository<OscypekEntity>
  ) {}

  createItem(req: CreateOscypekDTO): Observable<CreateOscypekRequest> {
    return from(this.oscypekRepository.save(req));
  }

  deleteItem(id: string): Observable<DeleteResult> {
    return from(this.oscypekRepository.delete(id));
  }

  findItem(id: string): Observable<Oscypek> {
    return from(
      this.oscypekRepository.findOne({
        where: [{ id: id }],
        select: [
          'availableAmount',
          'createdAt',
          'updatedAt',
          'group',
          'id',
          'name',
          'price',
          'type',
          'size',
        ],
      })
    );
  }

  updateItem(
    id: string,
    req: UpdateOscypekDTO
  ): Observable<UpdateOscypekResponse> {
    return from(this.oscypekRepository.update(id, req)).pipe(
      switchMap(() => {
        return from(
          this.oscypekRepository.findOne({
            where: [{ id: id }],
          })
        );
      })
    );
  }

  findList(req: FindOscypekListDTO): Observable<FindOscypekListResponse> {
    const { pageNumber, pageSize, filters, sort } = req;
    const skip = pageNumber * pageSize;

    const whereQuery =
      filters &&
      filters.length > 0 &&
      filters.map((filter) => {
        return {
          [`${filter.name}`]: filter.value,
        };
      });

    const orderQuery =
      sort && sort.orderBy && sort.sortBy
        ? { [`${sort.orderBy}`]: sort.sortBy }
        : {};

    return from(
      this.oscypekRepository.find({
        where: whereQuery,
        order: orderQuery,
        take: pageSize,
        skip: skip,
      })
    ).pipe(
      map((oscypekEntity: OscypekEntity[]) => {
        return {
          items: oscypekEntity,
          pageNumber,
          pageSize,
          filters,
          sort,
        };
      })
    );
  }
}
