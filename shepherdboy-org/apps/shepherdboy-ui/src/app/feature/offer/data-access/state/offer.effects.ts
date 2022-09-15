import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import {
  CreateOrderResponse,
  FindAdditiveListResponse,
  FindOscypekListResponse,
  generateDefaultListQuery,
  isDefined,
} from '@shepherdboy-org/api-interfaces';
import { catchError, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { OfferRestService } from '../offer.rest.service';

import * as OfferActions from './offer.actions';
import { OfferEntity } from './offer.models';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ROUTE_LINK } from 'apps/shepherdboy-ui/src/app/model/route-link.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class OfferEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly offerRestService: OfferRestService,
    private readonly store: Store<OfferEntity>,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.initOffer),
      fetch({
        run: () => {
          return OfferActions.loadOfferSuccess({ offer: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return OfferActions.loadOfferFailure({ error });
        },
      })
    )
  );

  fetchOscypekList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.fetchOscypekList),
      withLatestFrom(this.store),
      switchMap(([action, storeState]) => {
        const state = (storeState as any).offer;
        const listQuery = isDefined(action.listQuery)
          ? action.listQuery
          : state.oscypekListListQuery
          ? state.oscypekListListQuery
          : generateDefaultListQuery();

        return this.offerRestService.fetchOscypekList(listQuery).pipe(
          switchMap((resp: FindOscypekListResponse) => {
            return [OfferActions.fetchOscypekListSuccess({ resp })];
          }),
          catchError((error: string) =>
            of(OfferActions.fetchOscypekListFailure({ error }))
          )
        );
      })
    )
  );

  fetchAdditiveList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.fetchAdditiveList),
      withLatestFrom(this.store),
      switchMap(([action, storeState]) => {
        const state = (storeState as any).offer;
        const listQuery = isDefined(action.listQuery)
          ? action.listQuery
          : state.additiveListListQuery
          ? state.additiveListListQuery
          : generateDefaultListQuery();

        return this.offerRestService.fetchAdditiveList(listQuery).pipe(
          switchMap((resp: FindAdditiveListResponse) => {
            return [OfferActions.fetchAdditiveListSuccess({ resp })];
          }),
          catchError((error: string) =>
            of(OfferActions.fetchAdditiveListFailure({ error }))
          )
        );
      })
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.createOrder),
      withLatestFrom(this.store),
      switchMap(([action, storeState]) => {
        return this.offerRestService
          .createOrder(
            (storeState as any).offer.shippingDetails,
            (storeState as any).offer.orderItems
          )
          .pipe(
            switchMap((resp: CreateOrderResponse) => {
              return [OfferActions.createOrderSuccess({ resp })];
            }),
            catchError((error: string) =>
              of(OfferActions.createOrderFailure({ error }))
            )
          );
      })
    )
  );

  createOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OfferActions.createOrderSuccess),
        withLatestFrom(this.store),
        switchMap(([action, storeState]) =>
          of(
            OfferActions.fetchOscypekList({
              listQuery: (storeState as any).offer.oscypekListListQuery,
            })
          )
        ),
        switchMap(() => of(OfferActions.clearOrderState())),
        tap(() => {
          this.toastr.success('The order has been submitted', 'Yay 😍');
        }),
        tap(() => {
          this.router.navigate([`../`]);
        })
      ),
    { dispatch: true }
  );
}
