import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AdditiveListView,
  CreateOrderView,
  OfferEntity,
  OrderView,
  OscypekListView,
  ShippingDetailsView,
} from './offer.models';
import { OFFER_FEATURE_KEY, OfferState, offerAdapter } from './offer.reducer';
import bigDecimal from 'js-big-decimal';

export const getOfferState =
  createFeatureSelector<OfferState>(OFFER_FEATURE_KEY);

const { selectAll, selectEntities } = offerAdapter.getSelectors();

export const getOfferLoaded = createSelector(
  getOfferState,
  (state: OfferState) => state.loaded
);

export const getOfferError = createSelector(
  getOfferState,
  (state: OfferState) => state.error
);

export const getAllOffer = createSelector(getOfferState, (state: OfferState) =>
  selectAll(state)
);

export const getOfferEntities = createSelector(
  getOfferState,
  (state: OfferState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getOfferState,
  (state: OfferState) => state.selectedId
);

export const getSelected = createSelector(
  getOfferEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getOscypekListView = createSelector<
  OfferEntity,
  OfferState,
  OscypekListView
>(getOfferState, (state: OfferState) => {
  return {
    items: state.oscypekList,
    isLoading: state.oscypekListLoading,
    error: state.oscypekListError,
    listQuery: state.oscypekListListQuery,
  };
});

export const getAdditiveListView = createSelector<
  OfferEntity,
  OfferState,
  AdditiveListView
>(getOfferState, (state: OfferState) => {
  return {
    items: state.additiveList,
    isLoading: state.additiveListLoading,
    error: state.additiveListError,
    listQuery: state.additiveListListQuery,
  };
});

export const getOrderView = createSelector<OfferEntity, OfferState, OrderView>(
  getOfferState,
  (state: OfferState) => {
    return {
      items: state.orderItems,
      totalCost: state.orderItems
        ? state.orderItems.reduce((previousValue, currentValue) => {
            const additivesConst = currentValue.additives.reduce(
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
            );
            return Number(
              bigDecimal.add(
                bigDecimal.add(previousValue, additivesConst),
                bigDecimal.multiply(
                  Number(currentValue.oscypek.price),
                  currentValue.oscypek.quantity
                )
              )
            );
          }, 0)
        : 0,
    };
  }
);

export const getShippingDetailsView = createSelector<
  OfferEntity,
  OfferState,
  ShippingDetailsView
>(getOfferState, (state: OfferState) => {
  return {
    details: state.shippingDetails,
  };
});

export const getCreateOrderView = createSelector<
  OfferEntity,
  OfferState,
  CreateOrderView
>(getOfferState, (state: OfferState) => {
  return {
    isSuccess: state.createOrderSuccess,
    isLoading: state.createOrderLoading,
    error: state.createOrderError,
  };
});
