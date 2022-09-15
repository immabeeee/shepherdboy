import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListQuery } from '@shepherdboy-org/api-interfaces';
import * as Actions from './state/order.actions';

@Injectable()
export class OrderService {
  constructor(private store: Store) {}

  public fetchOrderList(listQuery?: ListQuery): void {
    this.store.dispatch(Actions.fetchOrderList({ listQuery }));
  }
}
