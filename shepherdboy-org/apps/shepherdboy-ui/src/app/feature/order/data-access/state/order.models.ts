import { ListQuery, Order } from '@shepherdboy-org/api-interfaces';
import { OrderFactored } from '../../model/order-factored.model';

/**
 * Interface for the 'Order' data
 */
export interface OrderEntity {
  id: string | number; // Primary ID
  name: string;

  orderList: Order[] | null;
  orderListLoading: boolean;
  orderListError: string | null;
  orderListListQuery: ListQuery | null;
}

export interface OrderListView {
  items: Order[] | null;
  itemsFactored: OrderFactored[] | null;
  isLoading: boolean;
  error: string | null;
  listQuery: ListQuery | null;
}
