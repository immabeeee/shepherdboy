import { Filter, Sort } from '@shepherdboy-org/api-interfaces';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FindOscypekListDTO {
  @IsNotEmpty()
  @IsNumber()
  pageNumber: number;

  @IsNotEmpty()
  @IsNumber()
  pageSize: number;

  @IsOptional()
  filters: Filter[];

  @IsOptional()
  sort: Sort;
}
