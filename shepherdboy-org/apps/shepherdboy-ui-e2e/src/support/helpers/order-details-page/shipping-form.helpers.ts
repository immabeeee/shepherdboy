import { faker } from '@faker-js/faker';

export const getInput = (name: string) =>
  cy.get(`[data-test-id="org-shipping-form-${name}-input"]`);
export const getSaveButton = () =>
  cy.get('[data-test-id="org-shipping-form-save-button"]');

export const checkIElementsExist = () => {
  getInput('firstName').should('be.visible');
  getInput('lastName').should('be.visible');
  getInput('city').should('be.visible');
  getInput('zipCode').should('be.visible');
  getInput('street').should('be.visible');
  getInput('houseNumber').should('be.visible');
};

export const fillForm = () => {
  getInput('firstName').click().clear().type(faker.name.firstName());
  getInput('lastName').click().clear().type(faker.name.lastName());
  getInput('city').click().clear().type(faker.address.cityName());
  getInput('zipCode').click().clear().type(faker.address.zipCode());
  getInput('street').click().clear().type(faker.address.streetName());
  getInput('houseNumber')
    .click()
    .clear()
    .type(faker.datatype.number({ min: 0, max: 99 }).toString());
  getInput('apartmentNumber')
    .click()
    .clear()
    .type(faker.datatype.number({ min: 0, max: 99 }).toString());
};
