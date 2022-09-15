import { OfferState } from './offer.reducer';
import { initialOfferState } from './offer.reducer';
import * as testData from '@shepherdboy-org/test-utils';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import {
  getAdditiveListView,
  getCreateOrderView,
  getOrderView,
  getOscypekListView,
  getShippingDetailsView,
} from './offer.selectors';

describe('Selectors', () => {
  it('should select getOscypekListView', () => {
    // given
    const state1: OfferState = {
      ...initialOfferState,
      oscypekList: null,
      oscypekListLoading: false,
      oscypekListError: null,
      oscypekListListQuery: null,
    };

    const state2: OfferState = {
      ...initialOfferState,
      oscypekList: [testData.oscypek],
      oscypekListLoading: false,
      oscypekListError: null,
      oscypekListListQuery: generateDefaultListQuery(),
    };

    // when
    const result1 = getOscypekListView.projector(state1);
    const result2 = getOscypekListView.projector(state2);

    // then
    expect(result1).toEqual({
      items: state1.oscypekList,
      isLoading: state1.oscypekListLoading,
      error: state1.oscypekListError,
      listQuery: state1.oscypekListListQuery,
    });
    expect(result2).toEqual({
      items: state2.oscypekList,
      isLoading: state2.oscypekListLoading,
      error: state2.oscypekListError,
      listQuery: state2.oscypekListListQuery,
    });
  });

  it('should select getAdditiveListView', () => {
    // given
    const state1: OfferState = {
      ...initialOfferState,
      additiveList: null,
      additiveListLoading: false,
      additiveListError: null,
      additiveListListQuery: null,
    };

    const state2: OfferState = {
      ...initialOfferState,
      additiveList: [testData.additive],
      additiveListLoading: false,
      additiveListError: null,
      additiveListListQuery: generateDefaultListQuery(),
    };

    // when
    const result1 = getAdditiveListView.projector(state1);
    const result2 = getAdditiveListView.projector(state2);

    // then
    expect(result1).toEqual({
      items: state1.additiveList,
      isLoading: state1.additiveListLoading,
      error: state1.additiveListError,
      listQuery: state1.additiveListListQuery,
    });
    expect(result2).toEqual({
      items: state2.additiveList,
      isLoading: state2.additiveListLoading,
      error: state2.additiveListError,
      listQuery: state2.additiveListListQuery,
    });
  });

  it('should select getOrderView', () => {
    // given
    const state1: OfferState = {
      ...initialOfferState,
      orderItems: null,
    };

    const state2: OfferState = {
      ...initialOfferState,
      orderItems: [testData.orderItem],
    };

    const state3: OfferState = {
      ...initialOfferState,
      orderItems: [
        {
          oscypek: {
            ...testData.orderItem.oscypek,
            id: '1',
            quantity: 20,
            price: 90.1,
          },
          additives: [
            {
              ...testData.orderItem.additives[0],
              id: '2',
              quantity: 25,
              price: 12.1,
            },
            {
              ...testData.orderItem.additives[0],
              id: '1',
              quantity: 25,
              price: 12.1,
            },
          ],
        },
        {
          oscypek: {
            ...testData.orderItem.oscypek,
            id: '1',
            quantity: 12,
            price: 45.1,
          },
          additives: [
            {
              ...testData.orderItem.additives[0],
              id: '2',
              quantity: 2,
              price: 23.1,
            },
            {
              ...testData.orderItem.additives[0],
              id: '1',
              quantity: 2,
              price: 33.1,
            },
          ],
        },
      ],
    };

    // when
    const result1 = getOrderView.projector(state1);
    const result2 = getOrderView.projector(state2);
    const result3 = getOrderView.projector(state3);

    // then
    expect(result1).toEqual({
      items: state1.orderItems,
      totalCost: 0,
    });
    expect(result2).toEqual({
      items: state2.orderItems,
      totalCost: 1037.52,
    });
    expect(result3).toEqual({
      items: state3.orderItems,
      totalCost: 3060.6,
    });
  });

  it('should select getShippingDetailsView', () => {
    // given
    const state1: OfferState = {
      ...initialOfferState,
      shippingDetails: null,
    };

    const state2: OfferState = {
      ...initialOfferState,
      shippingDetails: testData.shippingDetails,
    };

    // when
    const result1 = getShippingDetailsView.projector(state1);
    const result2 = getShippingDetailsView.projector(state2);

    // then
    expect(result1).toEqual({
      details: state1.shippingDetails,
    });
    expect(result2).toEqual({
      details: state2.shippingDetails,
    });
  });

  it('should select getCreateOrderView', () => {
    // given
    const state1: OfferState = {
      ...initialOfferState,
      createOrderSuccess: false,
      createOrderLoading: false,
      createOrderError: null,
    };

    const state2: OfferState = {
      ...initialOfferState,
      createOrderSuccess: false,
      createOrderLoading: true,
      createOrderError: null,
    };

    // when
    const result1 = getCreateOrderView.projector(state1);
    const result2 = getCreateOrderView.projector(state2);

    // then
    expect(result1).toEqual({
      isSuccess: state1.createOrderSuccess,
      isLoading: state1.createOrderLoading,
      error: state1.createOrderError,
    });
    expect(result2).toEqual({
      isSuccess: state2.createOrderSuccess,
      isLoading: state2.createOrderLoading,
      error: state2.createOrderError,
    });
  });
});
