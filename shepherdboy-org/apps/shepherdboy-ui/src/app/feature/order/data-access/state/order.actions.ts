import { createAction, props } from '@ngrx/store';
import { FindOrderListResponse, ListQuery, Order } from '@shepherdboy-org/api-interfaces';
import { OrderEntity } from './order.models';

export const initOrder = createAction('[Order Page] Init');

export const loadOrderSuccess = createAction(
  '[Order/API] Load Order Success',
  props<{ offer: OrderEntity[] }>()
);

export const loadOrderFailure = createAction(
  '[Order/API] Load Order Failure',
  props<{ error: any }>()
);

export const fetchOrderList = createAction(
  '[Order/API] Fetch Order List',
  props<{ listQuery?: ListQuery }>()
);

export const fetchOrderListSuccess = createAction(
  '[Order/API] Fetch Order List Success',
  props<{ resp: FindOrderListResponse }>()
);

export const fetchOrderListFailure = createAction(
  '[Order/API] Fetch Order List Failure',
  props<{ error: string }>()
);
