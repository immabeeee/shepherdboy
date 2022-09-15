import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import {
  Additive,
  AdditiveOrderItem,
  ListQuery,
  OrderItem,
  Oscypek,
} from '@shepherdboy-org/api-interfaces';
import { ShippingDetailsFormValue } from '@shepherdboy-org/ui-shipping-form';

import * as OfferActions from './offer.actions';
import { OfferEntity } from './offer.models';

export const OFFER_FEATURE_KEY = 'offer';

export interface OfferState extends EntityState<OfferEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;

  oscypekList: Oscypek[] | null;
  oscypekListLoading: boolean;
  oscypekListError: string | null;
  oscypekListListQuery: ListQuery | null;

  additiveList: Additive[] | null;
  additiveListLoading: boolean;
  additiveListError: string | null;
  additiveListListQuery: ListQuery | null;

  orderLoading: boolean;
  orderError: string | null;
  orderItems: OrderItem[] | null;

  shippingDetails: ShippingDetailsFormValue | null;

  createOrderSuccess: boolean;
  createOrderLoading: boolean;
  createOrderError: string | null;
}

export interface OfferPartialState {
  readonly [OFFER_FEATURE_KEY]: OfferState;
}

export const offerAdapter: EntityAdapter<OfferEntity> =
  createEntityAdapter<OfferEntity>();

export const initialOfferState: OfferState = offerAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  oscypekList: null,
  oscypekListLoading: false,
  oscypekListError: null,
  oscypekListListQuery: null,
  additiveList: null,
  additiveListLoading: false,
  additiveListError: null,
  additiveListListQuery: null,

  shippingDetails: null,

  orderLoading: false,
  orderError: null,
  orderItems: null,

  createOrderSuccess: false,
  createOrderLoading: false,
  createOrderError: null,
});

const reducer = createReducer(
  initialOfferState,
  on(OfferActions.initOffer, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(OfferActions.loadOfferSuccess, (state, { offer }) =>
    offerAdapter.setAll(offer, { ...state, loaded: true })
  ),
  on(OfferActions.loadOfferFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(OfferActions.fetchOscypekList, (state, action) => ({
    ...state,
    oscypekList: null,
    oscypekListLoading: true,
    oscypekListError: null,
    oscypekListListQuery: action.listQuery
      ? action.listQuery
      : state.oscypekListListQuery,
  })),
  on(OfferActions.fetchOscypekListSuccess, (state, action) => ({
    ...state,
    oscypekList: action.resp.items,
    oscypekListLoading: false,
    oscypekListError: null,
    oscypekListListQuery: state.oscypekListListQuery
      ? state.oscypekListListQuery?.updatePage(
          action.resp.pageNumber,
          action.resp.pageSize
        )
      : state.oscypekListListQuery,
  })),
  on(OfferActions.fetchOscypekListFailure, (state, action) => ({
    ...state,
    oscypekList: null,
    oscypekListLoading: false,
    oscypekListError: action.error,
  })),
  on(OfferActions.fetchAdditiveList, (state, action) => ({
    ...state,
    additiveList: null,
    additiveListLoading: true,
    additiveListError: null,
    additiveListListQuery: action.listQuery
      ? action.listQuery
      : state.additiveListListQuery,
  })),
  on(OfferActions.fetchAdditiveListSuccess, (state, action) => ({
    ...state,
    additiveList: action.resp.items,
    additiveListLoading: false,
    additiveListError: null,
    additiveListListQuery: state.additiveListListQuery
      ? state.additiveListListQuery?.updatePage(
          action.resp.pageNumber,
          action.resp.pageSize
        )
      : state.additiveListListQuery,
  })),
  on(OfferActions.fetchAdditiveListFailure, (state, action) => ({
    ...state,
    additiveList: null,
    additiveListLoading: false,
    additiveListError: action.error,
  })),
  on(OfferActions.addOrderItem, (state, action) => ({
    ...state,
    orderItems: state.orderItems
      ? addOrderItem(state.orderItems, action.orderItem)
      : [action.orderItem],
  })),
  on(OfferActions.removeOrderItem, (state, action) => ({
    ...state,
    orderItems: state.orderItems
      ? removeOrderItem(state.orderItems, action.orderItemId)
      : state.orderItems,
  })),
  on(OfferActions.removeOrderItemAdditive, (state, action) => ({
    ...state,
    orderItems: state.orderItems
      ? removeOrderItemAdditive(
          state.orderItems,
          action.orderItemId,
          action.additiveId
        )
      : state.orderItems,
  })),
  on(OfferActions.updateOrderItemQuantity, (state, action) => ({
    ...state,
    orderItems: state.orderItems
      ? updateOrderItemQuantity(
          state.orderItems,
          action.orderItemId,
          action.qty
        )
      : state.orderItems,
  })),
  on(OfferActions.updateOrderItemAdditiveQuantity, (state, action) => ({
    ...state,
    orderItems: state.orderItems
      ? updateOrderItemAdditiveQuantity(
          state.orderItems,
          action.orderItemId,
          action.additiveId,
          action.qty
        )
      : state.orderItems,
  })),
  on(OfferActions.updateShippingDetails, (state, action) => ({
    ...state,
    shippingDetails: action.details,
  })),
  on(OfferActions.createOrder, (state, action) => ({
    ...state,
    createOrderSuccess: false,
    createOrderLoading: true,
    createOrderError: null,
  })),
  on(OfferActions.createOrderSuccess, (state, action) => ({
    ...state,
    createOrderSuccess: true,
    createOrderLoading: false,
    createOrderError: null,
  })),
  on(OfferActions.createOrderFailure, (state, action) => ({
    ...state,
    createOrderSuccess: false,
    createOrderLoading: false,
    createOrderError: action.error,
  })),
  on(OfferActions.clearOrderState, (state, action) => ({
    ...state,
    shippingDetails: null,

    orderLoading: false,
    orderError: null,
    orderItems: null,

    createOrderSuccess: false,
    createOrderLoading: false,
    createOrderError: null,
  }))
);

export function offerReducer(state: OfferState | undefined, action: Action) {
  return reducer(state, action);
}

function updateOrderItemAdditiveQuantity(
  orderItems: OrderItem[],
  orderItemId: string,
  additiveId: string,
  qty: number
): OrderItem[] {
  const elementExists = orderItems.find((e) => e.oscypek.id === orderItemId);

  if (!elementExists) return orderItems;

  return orderItems.map((e) =>
    e.oscypek.id === orderItemId
      ? {
          ...e,
          additives: e.additives.map((additive) =>
            additive.id === additiveId
              ? { ...additive, quantity: qty }
              : additive
          ),
        }
      : e
  );
}

function removeOrderItemAdditive(
  orderItems: OrderItem[],
  orderItemId: string,
  additiveId: string
): OrderItem[] {
  const elementExists = orderItems.find((e) => e.oscypek.id === orderItemId);

  if (!elementExists) return orderItems;

  return orderItems.map((e) =>
    e.oscypek.id === orderItemId
      ? { ...e, additives: e.additives.filter((e) => e.id !== additiveId) }
      : e
  );
}

function updateOrderItemQuantity(
  orderItems: OrderItem[],
  orderItemId: string,
  qty: number
): OrderItem[] {
  return orderItems.map((e) =>
    e.oscypek.id === orderItemId
      ? { ...e, oscypek: { ...e.oscypek, quantity: qty } }
      : e
  );
}

function removeOrderItem(
  orderItems: OrderItem[],
  orderItemId: string
): OrderItem[] {
  return orderItems.filter((e) => e.oscypek.id !== orderItemId);
}

function addOrderItem(
  orderItems: OrderItem[],
  orderItem: OrderItem
): OrderItem[] {
  const elementExists = orderItems.find(
    (e) => e.oscypek.id === orderItem.oscypek.id
  );

  if (elementExists) {
    return orderItems.map((e) => {
      return {
        oscypek: {
          ...e.oscypek,
          quantity: e.oscypek.quantity + orderItem.oscypek.quantity,
        },
        additives: addOrderItemAdditives(e.additives, orderItem.additives),
      };
    });
  } else {
    return [...orderItems, orderItem];
  }
}

function addOrderItemAdditives(
  oldAdditives: AdditiveOrderItem[],
  additives: AdditiveOrderItem[]
): AdditiveOrderItem[] {
  const newAdditives = additives.filter(
    (additive) =>
      !oldAdditives.some((oldAdditive) => additive.id === oldAdditive.id)
  );
  const oldAdditivesUpdated = oldAdditives.map((oldAdditive) => {
    const existingAdditive = additives.find(
      (additive) => additive.id === oldAdditive.id
    );
    if (existingAdditive) {
      return {
        ...oldAdditive,
        quantity: oldAdditive.quantity + existingAdditive.quantity,
      };
    }
    return oldAdditive;
  });
  return [...oldAdditivesUpdated, ...newAdditives];
}
