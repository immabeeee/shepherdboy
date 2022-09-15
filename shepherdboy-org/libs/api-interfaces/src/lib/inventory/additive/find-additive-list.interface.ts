import { Filter, Sort } from '../../list-query';
import { Additive } from './additive.inferface';

export interface FindAdditiveListRequest {
  pageNumber: number;
  pageSize: number;
  filters?: Filter[];
  sort?: Sort;
}

export interface FindAdditiveListResponse {
  items: Additive[];
  pageNumber: number;
  pageSize: number;
  filters?: Filter[];
  sort?: Sort;
}
