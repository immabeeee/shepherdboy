import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderEntity, OrderListView } from './order.models';
import { ORDER_FEATURE_KEY, offerAdapter, OrderState } from './order.reducer';
import bigDecimal from 'js-big-decimal';

export const getOrderState =
  createFeatureSelector<OrderState>(ORDER_FEATURE_KEY);

const { selectAll, selectEntities } = offerAdapter.getSelectors();

export const getOrderLoaded = createSelector(
  getOrderState,
  (state: OrderState) => state.loaded
);

export const getOrderError = createSelector(
  getOrderState,
  (state: OrderState) => state.error
);

export const getAllOrder = createSelector(getOrderState, (state: OrderState) =>
  selectAll(state)
);

export const getOrderEntities = createSelector(
  getOrderState,
  (state: OrderState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getOrderState,
  (state: OrderState) => state.selectedId
);

export const getSelected = createSelector(
  getOrderEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getOrderListView = createSelector<OrderEntity, OrderState, any>(
  getOrderState,
  (state: OrderState) => {
    return {
      items: state.orderList,
      itemsFactored: state.orderList?.map((e) => {
        return {
          ...e,
          itemsQuantity: e.items.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.quantity,
            0
          ),
          itemsAmount: e.items.reduce(
            (previousValue, currentValue) =>
              Number(
                bigDecimal.add(
                  previousValue,
                  bigDecimal.multiply(
                    Number(currentValue.price),
                    currentValue.quantity
                  )
                )
              ),
            0
          ),
        };
      }),
      isLoading: state.orderListLoading,
      error: state.orderListError,
      listQuery: state.orderListListQuery,
    };
  }
);
