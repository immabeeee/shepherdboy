export const getSectionTitle = () =>
  cy.get('[data-test-id="org-oscypek-list-title"]');
export const getSectionFilters = () =>
  cy.get('[data-test-id="org-oscypek-list-filters"]');
export const getSectionTypeFilter = () =>
  cy.get('[data-test-id="org-oscypek-list-filters-type-select"]');
export const getSectionSizeFilter = () =>
  cy.get('[data-test-id="org-oscypek-list-filters-size-select"]');
export const getOrderSummaryInfo = () =>
  cy.get('[data-test-id="org-order-summary-info"]');

export const getFirstItem = (nestedSelector?: string) =>
  cy
    .get(
      `[data-test-id="org-oscypek-list-item"]${
        nestedSelector ? nestedSelector : ''
      }`
    )
    .first();

export const getListItem = (id: string, nestedSelector?: string) =>
  cy.get(
    `[data-test-id="org-oscypek-list-item-${id}"]${
      nestedSelector ? nestedSelector : ''
    }`
  );

export const checkIfOfferListElementsExist = () => {
  getSectionTitle().should('be.visible');
  getSectionFilters().should('be.visible');
  getSectionTypeFilter().should('be.visible');
  getSectionSizeFilter().should('be.visible');
};
