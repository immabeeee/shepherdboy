import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderListView } from './order.models';

import * as OrderStateSelectors from './order.selectors';

@Injectable()
export class OrderStateFacade {
  orderListView$: Observable<OrderListView> = this.store.pipe(
    select(OrderStateSelectors.getOrderListView) as any
  );

  constructor(private readonly store: Store) {}
}
