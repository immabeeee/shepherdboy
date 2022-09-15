import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { Action } from '@ngrx/store';
import { subscribeSpyTo, SubscriberSpy } from '@hirez_io/observer-spy';
import { Router } from '@angular/router';
import { initialOfferState } from './offer.reducer';
import { OfferEffects } from './offer.effects';
import { OfferEntity } from './offer.models';
import { OfferRestService } from '../offer.rest.service';
import {
  CreateOrderResponse,
  FindAdditiveListResponse,
  FindOscypekListResponse,
  generateDefaultListQuery,
  Order,
} from '@shepherdboy-org/api-interfaces';
import * as OfferActions from './offer.actions';
import * as testData from '@shepherdboy-org/test-utils';

describe('Offer Effects', () => {
  let actions$: Observable<any>;
  let effects: OfferEffects;
  let store: MockStore<OfferEntity>;
  let offerRestService: OfferRestService;
  let obsSpy: SubscriberSpy<Action>;
  let router: Router;
  const OfferRestServiceMock = {
    fetchOscypekList: jest.fn(),
    fetchAdditiveList: jest.fn(),
    createOrder: jest.fn(),
  };
  const ToastrServiceMock = {
    success: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        OfferEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
              offer: {
                ...initialOfferState,
                shippingDetails: testData.shippingDetails,
              }
          },
        }),
        { provide: OfferRestService, useValue: OfferRestServiceMock },
        { provide: ToastrService, useValue: ToastrServiceMock },
      ],
    });
    effects = TestBed.inject(OfferEffects);
    store = TestBed.inject(MockStore);
    offerRestService = TestBed.inject(OfferRestService);
    router = TestBed.inject(Router);
  });

  afterEach(() => obsSpy?.unsubscribe());

  describe('onFetchOscypekList$', () => {
    it('should fire FetchOscypekListSuccess', fakeAsync(() => {
      const response: FindOscypekListResponse = {
        items: [],
        pageNumber: 0,
        pageSize: 10,
        filters: [],
        sort: undefined,
      };
      jest
        .spyOn(offerRestService, 'fetchOscypekList')
        .mockReturnValueOnce(of(response));

      actions$ = of(
        OfferActions.fetchOscypekList({ listQuery: generateDefaultListQuery() })
      );

      obsSpy = subscribeSpyTo(effects.fetchOscypekList$);

      flush();

      expect(obsSpy.getFirstValue()).toEqual(
        OfferActions.fetchOscypekListSuccess({ resp: response })
      );
    }));

    it('should fire FetchOscypekListFailure', fakeAsync(() => {
      const error = 'OOPS!';
      jest
        .spyOn(offerRestService, 'fetchOscypekList')
        .mockImplementation(() => {
          return throwError(() => new Error(error));
        });

      actions$ = of(
        OfferActions.fetchOscypekList({ listQuery: generateDefaultListQuery() })
      );

      obsSpy = subscribeSpyTo(effects.fetchOscypekList$, {
        expectErrors: true,
      });

      flush();

      expect(obsSpy.getFirstValue().type).toContain(
        OfferActions.fetchOscypekListFailure({ error }).type
      );
      expect((obsSpy.getFirstValue() as any).error.toString()).toContain(
        'OOPS!'
      );
    }));
  });

  describe('onFetchAdditiveList$', () => {
    it('should fire FetchAdditiveListSuccess', fakeAsync(() => {
      const response: FindAdditiveListResponse = {
        items: [],
        pageNumber: 0,
        pageSize: 10,
        filters: [],
        sort: undefined,
      };
      jest
        .spyOn(offerRestService, 'fetchAdditiveList')
        .mockReturnValueOnce(of(response));

      actions$ = of(
        OfferActions.fetchAdditiveList({
          listQuery: generateDefaultListQuery(),
        })
      );

      obsSpy = subscribeSpyTo(effects.fetchAdditiveList$);

      flush();

      expect(obsSpy.getFirstValue()).toEqual(
        OfferActions.fetchAdditiveListSuccess({ resp: response })
      );
    }));

    it('should fire FetchAdditiveListFailure', fakeAsync(() => {
      const error = 'OOPS!';
      jest
        .spyOn(offerRestService, 'fetchAdditiveList')
        .mockImplementation(() => {
          return throwError(() => new Error(error));
        });

      actions$ = of(
        OfferActions.fetchAdditiveList({
          listQuery: generateDefaultListQuery(),
        })
      );

      obsSpy = subscribeSpyTo(effects.fetchAdditiveList$, {
        expectErrors: true,
      });

      flush();

      expect(obsSpy.getFirstValue().type).toContain(
        OfferActions.fetchAdditiveListFailure({ error }).type
      );
      expect((obsSpy.getFirstValue() as any).error.toString()).toContain(
        'OOPS!'
      );
    }));
  });

  describe('onCreateOrder$', () => {
    it('should fire CreateOrderSuccess', fakeAsync(() => {
      const response: CreateOrderResponse = {
        order: {} as Order,
      };
      jest
        .spyOn(offerRestService, 'createOrder')
        .mockReturnValueOnce(of(response));

      actions$ = of(OfferActions.createOrder());

      obsSpy = subscribeSpyTo(effects.createOrder$);

      flush();

      expect(obsSpy.getFirstValue()).toEqual(
        OfferActions.createOrderSuccess({ resp: response })
      );
    }));

    // it('should fire CreateOrderFailure', fakeAsync(() => {
    //   const error = 'OOPS!';
    //   jest.spyOn(offerRestService, 'createOrder').mockImplementation(() => {
    //     return throwError(() => new Error(error));
    //   });

    //   actions$ = of(OfferActions.createOrder());

    //   obsSpy = subscribeSpyTo(effects.createOrder$, {
    //     expectErrors: true,
    //   });

    //   flush();

    //   expect(obsSpy.getFirstValue().type).toContain(
    //     OfferActions.createOrderFailure({ error }).type
    //   );
    //   expect((obsSpy.getFirstValue() as any).error.toString()).toContain(
    //     'OOPS!'
    //   );
    // }));
  });
});
