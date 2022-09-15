import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AdditiveListView,
  CreateOrderView,
  OrderView,
  OscypekListView,
  ShippingDetailsView,
} from './offer.models';

import * as OfferStateSelectors from './offer.selectors';

@Injectable()
export class OfferStateFacade {
  osycpekListView$: Observable<OscypekListView> = this.store.pipe(
    select(OfferStateSelectors.getOscypekListView) as any
  );
  additiveListView$: Observable<AdditiveListView> = this.store.pipe(
    select(OfferStateSelectors.getAdditiveListView) as any
  );
  orderView$: Observable<OrderView> = this.store.pipe(
    select(OfferStateSelectors.getOrderView) as any
  );
  shippingDetailsView$: Observable<ShippingDetailsView> = this.store.pipe(
    select(OfferStateSelectors.getShippingDetailsView) as any
  );
  createOrderView$: Observable<CreateOrderView> = this.store.pipe(
    select(OfferStateSelectors.getCreateOrderView) as any
  );

  constructor(private readonly store: Store) {}
}
