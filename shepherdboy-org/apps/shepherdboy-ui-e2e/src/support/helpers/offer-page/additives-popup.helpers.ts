export const getSectionTitle = () =>
  cy.get('[data-test-id="org-additive-dialog-title"]');
export const getSectionDescription = () =>
  cy.get('[data-test-id="org-additive-dialog-description"]');
export const getListItem = (id: string, nestedSelector?: string) =>
  cy.get(
    `[data-test-id="org-additive-dialog-list-item-${id}"]${
      nestedSelector ? nestedSelector : ''
    }`
  );
export const getFirstItem = (nestedSelector?: string) =>
  cy
    .get(
      `[data-test-id="org-additive-dialog-list-item"]${
        nestedSelector ? nestedSelector : ''
      }`
    )
    .first();

export const getCloseButton = () =>
  cy.get('[data-test-id="org-additive-dialog-close-button"]');
export const getAddButton = () =>
  cy.get('[data-test-id="org-additive-dialog-add-button"]');

export const checkIfElementsExist = () => {
  getSectionTitle().should('be.visible');
  getSectionDescription().should('be.visible');
  getCloseButton().should('be.visible');
  getAddButton().should('be.visible');
  getAddButton().should('be.disabled');
};
