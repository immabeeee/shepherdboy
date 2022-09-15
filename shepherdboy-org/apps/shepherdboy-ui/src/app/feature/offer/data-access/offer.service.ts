import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListQuery, OrderItem } from '@shepherdboy-org/api-interfaces';
import { ShippingDetailsFormValue } from '@shepherdboy-org/ui-shipping-form';
import * as Actions from './state/offer.actions';

@Injectable()
export class OfferService {
  constructor(private store: Store) {}

  public fetchOscypekList(listQuery?: ListQuery): void {
    this.store.dispatch(Actions.fetchOscypekList({ listQuery }));
  }

  public fetchAdditiveList(listQuery?: ListQuery): void {
    this.store.dispatch(Actions.fetchAdditiveList({ listQuery }));
  }

  public addOrderItem(orderItem: OrderItem): void {
    this.store.dispatch(Actions.addOrderItem({ orderItem }));
  }

  public removeOrderItem(orderItemId: string): void {
    this.store.dispatch(Actions.removeOrderItem({ orderItemId }));
  }

  public removeOrderItemAdditive(orderItemId: string, additiveId: string) {
    this.store.dispatch(
      Actions.removeOrderItemAdditive({ orderItemId, additiveId })
    );
  }

  public updateOrderItemQuantity(orderItemId: string, qty: number): void {
    this.store.dispatch(Actions.updateOrderItemQuantity({ orderItemId, qty }));
  }

  public updateOrderItemAdditiveQuantity(
    orderItemId: string,
    additiveId: string,
    qty: number
  ): void {
    this.store.dispatch(
      Actions.updateOrderItemAdditiveQuantity({ orderItemId, additiveId, qty })
    );
  }

  public updateShippingDetails(details: ShippingDetailsFormValue): void {
    this.store.dispatch(Actions.updateShippingDetails({ details }));
  }

  public createOrder(): void {
    this.store.dispatch(Actions.createOrder());
  }
}
