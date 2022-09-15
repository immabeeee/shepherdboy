import * as offerListHelpers from '../../support/helpers/offer-page/offer-list.helpers';
import * as additivesPopupHelpers from '../../support/helpers/offer-page/additives-popup.helpers';
import * as shippingFormHelpers from '../../support/helpers/order-details-page/shipping-form.helpers';
import * as orderDetailsPageHelpers from '../../support/helpers/order-details-page/order-details-page.helpers';

describe('Offer', () => {
  beforeEach(() => cy.visit('/'));

  it('should create an order', () => {
    offerListHelpers.checkIfOfferListElementsExist();
    offerListHelpers.getFirstItem().click();
    additivesPopupHelpers.checkIfElementsExist();
    additivesPopupHelpers.getFirstItem().click();
    additivesPopupHelpers.getAddButton().click();
    offerListHelpers.getOrderSummaryInfo().should('be.visible').click();
    shippingFormHelpers.checkIElementsExist();
    shippingFormHelpers.fillForm();
    shippingFormHelpers.getSaveButton().click();
    orderDetailsPageHelpers.getCreateOrderButton().click();
  });
});
