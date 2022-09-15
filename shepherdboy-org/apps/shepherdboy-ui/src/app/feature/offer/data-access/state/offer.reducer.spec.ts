import {
  CreateOrderRequest,
  CreateOrderResponse,
  FindAdditiveListResponse,
  FindAdditiveResponse,
  FindOscypekListResponse,
  generateDefaultListQuery,
  OrderItem,
} from '@shepherdboy-org/api-interfaces';
import {
  addOrderItem,
  clearOrderState,
  createOrder,
  createOrderFailure,
  createOrderSuccess,
  fetchAdditiveList,
  fetchAdditiveListFailure,
  fetchAdditiveListSuccess,
  fetchOscypekList,
  fetchOscypekListFailure,
  fetchOscypekListSuccess,
  removeOrderItem,
  removeOrderItemAdditive,
  updateOrderItemAdditiveQuantity,
  updateOrderItemQuantity,
  updateShippingDetails,
} from './offer.actions';
import * as reducer from './offer.reducer';
import * as testData from '@shepherdboy-org/test-utils';
import { orderItem } from '@shepherdboy-org/test-utils';

describe('OfferReducer', () => {
  describe('Fetch Oscypek List', () => {
    describe('fetchOscypekList action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialOfferState;
        const existingState2 = {
          ...reducer.initialOfferState,
          oscypekListListQuery: generateDefaultListQuery().updatePage(0, 100),
        };

        // when
        const action1 = fetchOscypekList({
          listQuery: generateDefaultListQuery().updatePage(1, 100),
        });
        const state1 = reducer.offerReducer(existingState1, action1);

        const action2 = fetchOscypekList({ listQuery: undefined });
        const state2 = reducer.offerReducer(existingState2, action2);

        // then

        expect(state1).toEqual({
          ...existingState1,
          oscypekList: null,
          oscypekListLoading: true,
          oscypekListError: null,
          oscypekListListQuery: generateDefaultListQuery().updatePage(1, 100),
        });
        expect(state1).not.toEqual(existingState1);
        expect(state2).toEqual({
          ...existingState2,
          oscypekList: null,
          oscypekListLoading: true,
          oscypekListError: null,
        });
        expect(state2).not.toEqual(existingState2);
      });
    });

    describe('fetchOscypekListSuccess action', () => {
      it('should retrieve oscypek list and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialOfferState,
          oscypekList: null,
          oscypekListLoading: true,
          oscypekListError: null,
          oscypekListListQuery: generateDefaultListQuery().updatePage(1, 100),
        };
        const resp: FindOscypekListResponse = {
          items: [testData.oscypek],
          pageNumber: 1,
          pageSize: 100,
          filters: [],
        };

        // when
        const action1 = fetchOscypekListSuccess({ resp });
        const state1 = reducer.offerReducer(existingState, action1);

        // then

        expect(state1).toEqual({
          ...existingState,
          oscypekList: [testData.oscypek],
          oscypekListLoading: false,
          oscypekListError: null,
          oscypekListListQuery: generateDefaultListQuery().updatePage(1, 100),
        });
        expect(state1).not.toEqual(existingState);
      });
    });

    describe('fetchOscypekListFailure action', () => {
      it('should retrieve error message and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialOfferState,
          oscypekList: null,
          oscypekListLoading: true,
          oscypekListError: null,
          oscypekListListQuery: generateDefaultListQuery().updatePage(1, 100),
        };
        const error = `Can't find any items`;

        // when
        const action1 = fetchOscypekListFailure({ error });
        const state1 = reducer.offerReducer(existingState, action1);

        // then

        expect(state1).toEqual({
          ...existingState,
          oscypekListLoading: false,
          oscypekListError: `Can't find any items`,
        });
        expect(state1).not.toEqual(existingState);
      });
    });
  });

  describe('Fetch Additive List', () => {
    describe('fetchAdditiveList action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialOfferState;
        const existingState2 = {
          ...reducer.initialOfferState,
          additiveListListQuery: generateDefaultListQuery().updatePage(0, 100),
        };

        // when
        const action1 = fetchAdditiveList({
          listQuery: generateDefaultListQuery().updatePage(1, 100),
        });
        const state1 = reducer.offerReducer(existingState1, action1);

        const action2 = fetchAdditiveList({ listQuery: undefined });
        const state2 = reducer.offerReducer(existingState2, action2);

        // then

        expect(state1).toEqual({
          ...existingState1,
          additiveList: null,
          additiveListLoading: true,
          additiveListError: null,
          additiveListListQuery: generateDefaultListQuery().updatePage(1, 100),
        });
        expect(state1).not.toEqual(existingState1);
        expect(state2).toEqual({
          ...existingState2,
          additiveList: null,
          additiveListLoading: true,
          additiveListError: null,
        });
        expect(state2).not.toEqual(existingState2);
      });
    });

    describe('fetchAdditiveListSuccess action', () => {
      it('should retrieve additive list and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialOfferState,
          additiveList: null,
          additiveListLoading: true,
          additiveListError: null,
          additiveListListQuery: generateDefaultListQuery().updatePage(1, 100),
        };
        const resp: FindAdditiveListResponse = {
          items: [testData.additive],
          pageNumber: 1,
          pageSize: 100,
          filters: [],
        };

        // when
        const action1 = fetchAdditiveListSuccess({ resp });
        const state1 = reducer.offerReducer(existingState, action1);

        // then

        expect(state1).toEqual({
          ...existingState,
          additiveList: [testData.additive],
          additiveListLoading: false,
          additiveListError: null,
          additiveListListQuery: generateDefaultListQuery().updatePage(1, 100),
        });
        expect(state1).not.toEqual(existingState);
      });
    });

    describe('fetchAdditiveListFailure action', () => {
      it('should retrieve error message and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialOfferState,
          additiveList: null,
          additiveListLoading: true,
          additiveListError: null,
          additiveListListQuery: generateDefaultListQuery().updatePage(1, 100),
        };
        const error = `Can't find any items`;

        // when
        const action1 = fetchAdditiveListFailure({ error });
        const state1 = reducer.offerReducer(existingState, action1);

        // then

        expect(state1).toEqual({
          ...existingState,
          additiveListLoading: false,
          additiveListError: `Can't find any items`,
        });
        expect(state1).not.toEqual(existingState);
      });
    });
  });

  describe('Add Order Item', () => {
    describe('addOrderItem action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialOfferState;
        const newItem: OrderItem = testData.anotherOrderItem;
        const existingState2 = {
          ...reducer.initialOfferState,
          orderItems: [testData.orderItem],
        };

        // when
        const action1 = addOrderItem({
          orderItem: newItem,
        });
        const state1 = reducer.offerReducer(existingState1, action1);

        const action2 = addOrderItem({ orderItem: newItem });
        const state2 = reducer.offerReducer(existingState2, action2);

        // then

        expect(state1).toEqual({
          ...existingState1,
          orderItems: [newItem],
        });
        expect(state1).not.toEqual(existingState1);
        expect(state2).toEqual({
          ...existingState2,
          orderItems: [testData.orderItem, newItem],
        });
        expect(state2).not.toEqual(existingState2);
      });
    });
  });

  describe('Remove Order Item', () => {
    describe('removeOrderItem action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialOfferState;
        const existingState2 = {
          ...reducer.initialOfferState,
          orderItems: [testData.orderItem],
        };

        // when
        const action1 = removeOrderItem({
          orderItemId: testData.orderItem.oscypek.id as string,
        });
        const state1 = reducer.offerReducer(existingState1, action1);

        const action2 = removeOrderItem({
          orderItemId: testData.orderItem.oscypek.id as string,
        });
        const state2 = reducer.offerReducer(existingState2, action2);

        // then

        expect(state1).toEqual({
          ...existingState1,
          orderItems: null,
        });
        expect(state1).toEqual(existingState1);
        expect(state2).toEqual({
          ...existingState2,
          orderItems: [],
        });
        expect(state2).not.toEqual(existingState2);
      });
    });
  });

  describe('Remove Order Item Add-on', () => {
    describe('removeOrderItemAdditive action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialOfferState;
        const existingState2 = {
          ...reducer.initialOfferState,
          orderItems: [testData.orderItem],
        };

        // when
        const action1 = removeOrderItemAdditive({
          orderItemId: testData.orderItem.oscypek.id as string,
          additiveId: testData.orderItem.additives[0].id as string,
        });
        const state1 = reducer.offerReducer(existingState1, action1);

        const action2 = removeOrderItemAdditive({
          orderItemId: testData.orderItem.oscypek.id as string,
          additiveId: testData.orderItem.additives[0].id as string,
        });
        const state2 = reducer.offerReducer(existingState2, action2);

        // then

        expect(state1).toEqual({
          ...existingState1,
          orderItems: null,
        });
        expect(state1).toEqual(existingState1);
        expect(state2).toEqual({
          ...existingState2,
          orderItems: [
            {
              oscypek: orderItem.oscypek,
              additives: [],
            },
          ],
        });
        expect(state2).not.toEqual(existingState2);
      });
    });
  });

  describe('Update Order Item Qty', () => {
    describe('updateOrderItemQuantity action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialOfferState;
        const existingState2 = {
          ...reducer.initialOfferState,
          orderItems: [testData.orderItem],
        };

        // when
        const action1 = updateOrderItemQuantity({
          orderItemId: testData.orderItem.oscypek.id as string,
          qty: 9999,
        });
        const state1 = reducer.offerReducer(existingState1, action1);

        const action2 = updateOrderItemQuantity({
          orderItemId: testData.orderItem.oscypek.id as string,
          qty: 9999,
        });
        const state2 = reducer.offerReducer(existingState2, action2);

        // then

        expect(state1).toEqual({
          ...existingState1,
          orderItems: null,
        });
        expect(state1).toEqual(existingState1);
        expect(state2).toEqual({
          ...existingState2,
          orderItems: [
            { ...orderItem, oscypek: { ...orderItem.oscypek, quantity: 9999 } },
          ],
        });
        expect(state2).not.toEqual(existingState2);
      });
    });
  });

  describe('Update Order Item Add-on Qty', () => {
    describe('updateOrderItemAdditiveQuantity action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialOfferState;
        const existingState2 = {
          ...reducer.initialOfferState,
          orderItems: [testData.orderItem],
        };

        // when
        const action1 = updateOrderItemAdditiveQuantity({
          orderItemId: testData.orderItem.oscypek.id as string,
          additiveId: testData.orderItem.additives[0].id as string,
          qty: 9999,
        });
        const state1 = reducer.offerReducer(existingState1, action1);

        const action2 = updateOrderItemAdditiveQuantity({
          orderItemId: testData.orderItem.oscypek.id as string,
          additiveId: testData.orderItem.additives[0].id as string,
          qty: 9999,
        });
        const state2 = reducer.offerReducer(existingState2, action2);

        // then

        expect(state1).toEqual({
          ...existingState1,
          orderItems: null,
        });
        expect(state1).toEqual(existingState1);
        expect(state2).toEqual({
          ...existingState2,
          orderItems: [
            {
              oscypek: orderItem.oscypek,
              additives: [{ ...orderItem.additives[0], quantity: 9999 }],
            },
          ],
        });
        expect(state2).not.toEqual(existingState2);
      });
    });
  });

  describe('Update Shipping Details', () => {
    describe('updateShippingDetails action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialOfferState;
        const existingState2 = {
          ...reducer.initialOfferState,
          updateShippingDetails: testData.shippingDetails,
        };

        // when
        const action1 = updateShippingDetails({
          details: { ...testData.shippingDetails, firstName: 'Joe' },
        });
        const state1 = reducer.offerReducer(existingState1, action1);

        const action2 = updateShippingDetails({
          details: { ...testData.shippingDetails, firstName: 'Joe' },
        });
        const state2 = reducer.offerReducer(existingState2, action2);

        // then

        expect(state1).toEqual({
          ...existingState1,
          shippingDetails: state1.shippingDetails,
        });
        expect(state1).not.toEqual(existingState1);
        expect(state2).toEqual({
          ...existingState2,
          shippingDetails: state2.shippingDetails,
        });
        expect(state2).not.toEqual(existingState2);
      });
    });
  });

  describe('Create order', () => {
    describe('createOrder action', () => {
      it('should update the state in an immutable way', () => {
        // given
        const existingState1 = reducer.initialOfferState;
        const existingState2 = {
          ...reducer.initialOfferState,
          shippingDetails: testData.shippingDetails,
          orderItems: [testData.orderItem],
        };

        // when
        const action1 = createOrder();
        const state1 = reducer.offerReducer(existingState1, action1);

        const action2 = createOrder();
        const state2 = reducer.offerReducer(existingState2, action2);

        // then

        expect(state1).toEqual({
          ...existingState1,
          createOrderSuccess: false,
          createOrderLoading: true,
          createOrderError: null,
        });
        expect(state1).not.toEqual(existingState1);
        expect(state2).toEqual({
          ...existingState2,
          createOrderSuccess: false,
          createOrderLoading: true,
          createOrderError: null,
        });
        expect(state2).not.toEqual(existingState2);
      });
    });

    describe('createOrderSuccess action', () => {
      it('should update the state in an immutable way after created an order', () => {
        // given
        const existingState = {
          ...reducer.initialOfferState,
          shippingDetails: testData.shippingDetails,
          orderItems: [testData.orderItem],
          createOrderSuccess: false,
          createOrderLoading: true,
          createOrderError: null,
        };
        const resp: CreateOrderResponse = {} as CreateOrderResponse;

        // when
        const action1 = createOrderSuccess({ resp });
        const state1 = reducer.offerReducer(existingState, action1);

        // then

        expect(state1).toEqual({
          ...existingState,
          createOrderSuccess: true,
          createOrderLoading: false,
          createOrderError: null,
        });
        expect(state1).not.toEqual(existingState);
      });
    });

    describe('createOrderFailure action', () => {
      it('should retrieve error message and update the state in an immutable way', () => {
        // given
        const existingState = {
          ...reducer.initialOfferState,
          shippingDetails: testData.shippingDetails,
          orderItems: [testData.orderItem],
          createOrderSuccess: false,
          createOrderLoading: true,
          createOrderError: null,
        };
        const error = `Can't create the order`;

        // when
        const action1 = createOrderFailure({ error });
        const state1 = reducer.offerReducer(existingState, action1);

        // then

        expect(state1).toEqual({
          ...existingState,
          createOrderLoading: false,
          createOrderError: `Can't create the order`,
        });
        expect(state1).not.toEqual(existingState);
      });
    });

    describe('clearOrderState action', () => {
      it('should clear the state after created an order', () => {
        // given
        const existingState = {
          ...reducer.initialOfferState,
          shippingDetails: testData.shippingDetails,
          orderItems: [testData.orderItem],
          createOrderSuccess: false,
          createOrderLoading: true,
          createOrderError: null,
        };

        // when
        const action1 = clearOrderState();
        const state1 = reducer.offerReducer(existingState, action1);

        // then

        expect(state1).toEqual({
          ...existingState,
          shippingDetails: null,
          orderItems: null,
          createOrderSuccess: false,
          createOrderLoading: false,
          createOrderError: null,
        });
        expect(state1).not.toEqual(existingState);
      });
    });
  });
});
