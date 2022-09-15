import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { ListQuery, Order } from '@shepherdboy-org/api-interfaces';

import * as OfferActions from './order.actions';
import { OrderEntity } from './order.models';

export const ORDER_FEATURE_KEY = 'order';

export interface OrderState extends EntityState<OrderEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;

  orderList: Order[] | null;
  orderListLoading: boolean;
  orderListError: string | null;
  orderListListQuery: ListQuery | null;
}

export interface OfferPartialState {
  readonly [ORDER_FEATURE_KEY]: OrderState;
}

export const offerAdapter: EntityAdapter<OrderEntity> =
  createEntityAdapter<OrderEntity>();

export const initialOfferState: OrderState = offerAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  orderList: null,
  orderListLoading: false,
  orderListError: null,
  orderListListQuery: null,
});

const reducer = createReducer(
  initialOfferState,
  on(OfferActions.initOrder, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(OfferActions.loadOrderSuccess, (state, { offer }) =>
    offerAdapter.setAll(offer, { ...state, loaded: true })
  ),
  on(OfferActions.loadOrderFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(OfferActions.fetchOrderList, (state, action) => ({
    ...state,
    orderList: null,
    orderListLoading: true,
    orderListError: null,
    orderListListQuery: action.listQuery
      ? action.listQuery
      : state.orderListListQuery,
  })),
  on(OfferActions.fetchOrderListSuccess, (state, action) => ({
    ...state,
    orderList: action.resp.items,
    orderListLoading: false,
    orderListError: null,
    orderListListQuery: state.orderListListQuery
      ? state.orderListListQuery?.updatePage(
          action.resp.pageNumber,
          action.resp.pageSize,
          action.resp.totalElements,
          action.resp.totalPages
        )
      : state.orderListListQuery,
  })),
  on(OfferActions.fetchOrderListFailure, (state, action) => ({
    ...state,
    orderList: null,
    orderListLoading: false,
    orderListError: action.error,
  }))
);

export function orderReducer(state: OrderState | undefined, action: Action) {
  return reducer(state, action);
}
