import {
  Additive,
  ListQuery,
  OrderItem,
  Oscypek,
} from '@shepherdboy-org/api-interfaces';
import { ShippingDetailsFormValue } from '@shepherdboy-org/ui-shipping-form';

/**
 * Interface for the 'Offer' data
 */
export interface OfferEntity {
  id: string | number; // Primary ID
  name: string;

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
}

export interface OscypekListView {
  items: Oscypek[] | null;
  isLoading: boolean;
  error: string | null;
  listQuery: ListQuery | null;
}

export interface AdditiveListView {
  items: Additive[] | null;
  isLoading: boolean;
  error: string | null;
  listQuery: ListQuery | null;
}

export interface OrderView {
  items: OrderItem[] | null;
  totalCost: number;
}

export interface ShippingDetailsView {
  details: ShippingDetailsFormValue | null;
}

export interface CreateOrderView {
  isSuccess: boolean;
  isLoading: boolean;
  error: string | null;
}
