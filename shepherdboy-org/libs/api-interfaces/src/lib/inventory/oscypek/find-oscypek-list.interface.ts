import { Filter, Sort } from '../../list-query';
import { Oscypek } from './oscypek.inferface';

export interface FindOscypekListRequest {
  pageNumber: number;
  pageSize: number;
  filters?: Filter[];
  sort?: Sort;
}

export interface FindOscypekListResponse {
  items: Oscypek[];
  pageNumber: number;
  pageSize: number;
  filters?: Filter[];
  sort?: Sort;
}
