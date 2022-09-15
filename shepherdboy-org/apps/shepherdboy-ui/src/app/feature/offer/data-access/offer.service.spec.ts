import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { OfferService } from './offer.service';
import { initialOfferState } from './../data-access/state/offer.reducer';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import * as testData from '@shepherdboy-org/test-utils';

describe('OfferService', () => {
  let service: OfferService;
  let store: MockStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore({
          initialState: initialOfferState,
        }),
        OfferService,
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    service = TestBed.inject(OfferService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchOscypekList', () => {
    it('should dispatch action after call fetchOscypekList method without listQuery', () => {
      // given
      jest.spyOn(service, 'fetchOscypekList');
      jest.spyOn(store, 'dispatch');
      // when
      service.fetchOscypekList();
      // then
      expect(service.fetchOscypekList).toBeCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith({
        listQuery: undefined,
        type: '[Offer/API] Fetch Oscypek List',
      });
    });

    it('should dispatch action after call fetchAdditiveList method with listQuery', () => {
      // given
      const listQuery = generateDefaultListQuery();
      jest.spyOn(service, 'fetchOscypekList');
      jest.spyOn(store, 'dispatch');
      // when
      service.fetchOscypekList(listQuery);
      // then
      expect(service.fetchOscypekList).toBeCalledWith(listQuery);
      expect(store.dispatch).toHaveBeenCalledWith({
        listQuery: listQuery,
        type: '[Offer/API] Fetch Oscypek List',
      });
    });
  });

  describe('fetchAdditiveList', () => {
    it('should dispatch action after call fetchAdditiveList method without listQuery', () => {
      // given
      jest.spyOn(service, 'fetchAdditiveList');
      jest.spyOn(store, 'dispatch');
      // when
      service.fetchAdditiveList();
      // then
      expect(service.fetchAdditiveList).toBeCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith({
        listQuery: undefined,
        type: '[Offer/API] Fetch Additive List',
      });
    });

    it('should dispatch action after call fetchAdditiveList method with listQuery', () => {
      // given
      const listQuery = generateDefaultListQuery();
      jest.spyOn(service, 'fetchAdditiveList');
      jest.spyOn(store, 'dispatch');
      // when
      service.fetchAdditiveList(listQuery);
      // then
      expect(service.fetchAdditiveList).toBeCalledWith(listQuery);
      expect(store.dispatch).toHaveBeenCalledWith({
        listQuery: listQuery,
        type: '[Offer/API] Fetch Additive List',
      });
    });
  });

  describe('addOrderItem', () => {
    it('should dispatch action after call addOrderItem method without listQuery', () => {
      // given
      const orderItem = testData.orderItem;
      jest.spyOn(service, 'addOrderItem');
      jest.spyOn(store, 'dispatch');
      // when
      service.addOrderItem(orderItem);
      // then
      expect(service.addOrderItem).toBeCalledWith(orderItem);
      expect(store.dispatch).toHaveBeenCalledWith({
        orderItem,
        type: '[Offer/API] Add Order Item',
      });
    });
  });

  describe('removeOrderItem', () => {
    it('should dispatch action after call removeOrderItem method without listQuery', () => {
      // given
      const orderItemId = 'lorem';
      jest.spyOn(service, 'removeOrderItem');
      jest.spyOn(store, 'dispatch');
      // when
      service.removeOrderItem(orderItemId);
      // then
      expect(service.removeOrderItem).toBeCalledWith(orderItemId);
      expect(store.dispatch).toHaveBeenCalledWith({
        orderItemId,
        type: '[Offer/API] Remove Order Item',
      });
    });
  });

  describe('removeOrderItemAdditive', () => {
    it('should dispatch action after call removeOrderItemAdditive method without listQuery', () => {
      // given
      const orderItemId = 'lorem';
      const additiveId = 'lorem2';
      jest.spyOn(service, 'removeOrderItemAdditive');
      jest.spyOn(store, 'dispatch');
      // when
      service.removeOrderItemAdditive(orderItemId, additiveId);
      // then
      expect(service.removeOrderItemAdditive).toBeCalledWith(
        orderItemId,
        additiveId
      );
      expect(store.dispatch).toHaveBeenCalledWith({
        orderItemId,
        additiveId,
        type: '[Offer/API] Remove Order Item/s additive',
      });
    });
  });

  describe('updateOrderItemQuantity', () => {
    it('should dispatch action after call updateOrderItemQuantity method without listQuery', () => {
      // given
      const orderItemId = 'lorem';
      const quantity = 22;
      jest.spyOn(service, 'updateOrderItemQuantity');
      jest.spyOn(store, 'dispatch');
      // when
      service.updateOrderItemQuantity(orderItemId, quantity);
      // then
      expect(service.updateOrderItemQuantity).toBeCalledWith(
        orderItemId,
        quantity
      );
      expect(store.dispatch).toHaveBeenCalledWith({
        orderItemId,
        qty: quantity,
        type: '[Offer/API] Update Order Item Qty',
      });
    });
  });

  describe('updateOrderItemAdditiveQuantity', () => {
    it('should dispatch action after call updateOrderItemAdditiveQuantity method without listQuery', () => {
      // given
      const orderItemId = 'lorem';
      const additiveId = 'lorem2';
      const quantity = 22;
      jest.spyOn(service, 'updateOrderItemAdditiveQuantity');
      jest.spyOn(store, 'dispatch');
      // when
      service.updateOrderItemAdditiveQuantity(
        orderItemId,
        additiveId,
        quantity
      );
      // then
      expect(service.updateOrderItemAdditiveQuantity).toBeCalledWith(
        orderItemId,
        additiveId,
        quantity
      );
      expect(store.dispatch).toHaveBeenCalledWith({
        orderItemId,
        additiveId,
        qty: quantity,
        type: '[Offer/API] Update Order Item Additive Qty',
      });
    });
  });

  describe('updateShippingDetails', () => {
    it('should dispatch action after call updateShippingDetails method without listQuery', () => {
      // given
      const shippingDetails = testData.shippingDetails;
      jest.spyOn(service, 'updateShippingDetails');
      jest.spyOn(store, 'dispatch');
      // when
      service.updateShippingDetails(shippingDetails);
      // then
      expect(service.updateShippingDetails).toBeCalledWith(shippingDetails);
      expect(store.dispatch).toHaveBeenCalledWith({
        details: shippingDetails,
        type: '[Offer/API] Update Shipping Details',
      });
    });
  });

  describe('createOrder', () => {
    it('should dispatch action after call createOrder method without listQuery', () => {
      // given
      jest.spyOn(service, 'createOrder');
      jest.spyOn(store, 'dispatch');
      // when
      service.createOrder();
      // then
      expect(service.createOrder).toBeCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: '[Offer/API] Create Order',
      });
    });
  });
});
