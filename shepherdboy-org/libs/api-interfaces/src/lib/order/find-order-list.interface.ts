import { Filter, Sort } from '../list-query';
import { Order } from './order.interface';

export interface FindOrderListRequest {
  pageNumber: number;
  pageSize: number;
  filters?: Filter[];
  sort?: Sort;
}

export interface FindOrderListResponse {
  items: Order[];
  pageNumber: number;
  pageSize: number;
  filters?: Filter[];
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
