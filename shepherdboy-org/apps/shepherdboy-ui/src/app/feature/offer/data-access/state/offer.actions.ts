import { createAction, props } from '@ngrx/store';
import { OfferEntity } from './offer.models';
import {
  CreateOrderResponse,
  FindAdditiveListResponse,
  FindOscypekListResponse,
  ListQuery,
  OrderItem,
} from '@shepherdboy-org/api-interfaces';
import { ShippingDetailsFormValue } from '@shepherdboy-org/ui-shipping-form';

export const initOffer = createAction('[Offer Page] Init');

export const loadOfferSuccess = createAction(
  '[Offer/API] Load Offer Success',
  props<{ offer: OfferEntity[] }>()
);

export const loadOfferFailure = createAction(
  '[Offer/API] Load Offer Failure',
  props<{ error: any }>()
);

export const fetchOscypekList = createAction(
  '[Offer/API] Fetch Oscypek List',
  props<{ listQuery?: ListQuery }>()
);

export const fetchOscypekListSuccess = createAction(
  '[Offer/API] Fetch Oscypek List Success',
  props<{ resp: FindOscypekListResponse }>()
);

export const fetchOscypekListFailure = createAction(
  '[Offer/API] Fetch Oscypek List Failure',
  props<{ error: string }>()
);

export const fetchAdditiveList = createAction(
  '[Offer/API] Fetch Additive List',
  props<{ listQuery?: ListQuery }>()
);

export const fetchAdditiveListSuccess = createAction(
  '[Offer/API] Fetch Additive List Success',
  props<{ resp: FindAdditiveListResponse }>()
);

export const fetchAdditiveListFailure = createAction(
  '[Offer/API] Fetch Additive List Failure',
  props<{ error: string }>()
);

export const addOrderItem = createAction(
  '[Offer/API] Add Order Item',
  props<{ orderItem: OrderItem }>()
);

export const removeOrderItem = createAction(
  '[Offer/API] Remove Order Item',
  props<{ orderItemId: string }>()
);

export const removeOrderItemAdditive = createAction(
  '[Offer/API] Remove Order Item/s additive',
  props<{ orderItemId: string; additiveId: string }>()
);

export const updateOrderItemQuantity = createAction(
  '[Offer/API] Update Order Item Qty',
  props<{ orderItemId: string; qty: number }>()
);

export const updateOrderItemAdditiveQuantity = createAction(
  '[Offer/API] Update Order Item Additive Qty',
  props<{ orderItemId: string; additiveId: string; qty: number }>()
);

export const updateShippingDetails = createAction(
  '[Offer/API] Update Shipping Details',
  props<{ details: ShippingDetailsFormValue }>()
);

export const createOrder = createAction('[Offer/API] Create Order');

export const createOrderSuccess = createAction(
  '[Offer/API] Create Order Success',
  props<{ resp: CreateOrderResponse }>()
);

export const createOrderFailure = createAction(
  '[Offer/API] Create Order Failure',
  props<{ error: string }>()
);

export const clearOrderState = createAction('[Offer/API] Clear Order State');
