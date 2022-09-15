import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import {
  FindOrderListResponse,
  generateDefaultListQuery,
  isDefined,
} from '@shepherdboy-org/api-interfaces';
import { catchError,  of, switchMap, withLatestFrom } from 'rxjs';

import * as OrderActions from './order.actions';
import { Store } from '@ngrx/store';
import { OrderRestService } from '../order.rest.service';
import { OrderEntity } from './order.models';

@Injectable()
export class OrderEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly orderRestService: OrderRestService,
    private readonly store: Store<OrderEntity>
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.initOrder),
      fetch({
        run: () => {
          return OrderActions.loadOrderSuccess({ offer: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return OrderActions.loadOrderFailure({ error });
        },
      })
    )
  );

  fetchOrderList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.fetchOrderList),
      withLatestFrom(this.store),
      switchMap(([action, storeState]) => {
        const listQuery = isDefined(action.listQuery)
          ? action.listQuery
          : storeState.orderListListQuery
          ? storeState.orderListListQuery
          : generateDefaultListQuery();

        return this.orderRestService.fetchOrderList(listQuery).pipe(
          switchMap((resp: FindOrderListResponse) => {
            return [OrderActions.fetchOrderListSuccess({ resp })];
          }),
          catchError((error: string) =>
            of(OrderActions.fetchOrderListFailure({ error }))
          )
        );
      })
    )
  );
}
