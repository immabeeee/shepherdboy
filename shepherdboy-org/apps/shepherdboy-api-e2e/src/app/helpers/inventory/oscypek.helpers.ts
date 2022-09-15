import { faker } from '@faker-js/faker';
import * as request from 'supertest';
import {
  InventoryItemGroup,
  Oscypek,
  OscypekSize,
  OscypekType,
} from '@shepherdboy-org/api-interfaces';

export const defaultOscypekList: Oscypek[] = [
  {
    name: 'Oscypek',
    size: OscypekSize.LARGE,
    type: OscypekType.NON_SMOKED,
    price: 20.99,
    availableAmount: 9423,
    group: InventoryItemGroup.OSCYPEK,
  },
  {
    name: 'Oscypek',
    size: OscypekSize.LARGE,
    type: OscypekType.SMOKED,
    price: 19.99,
    availableAmount: 6424,
    group: InventoryItemGroup.OSCYPEK,
  },
  {
    name: 'Oscypek',
    size: OscypekSize.MEDIUM,
    type: OscypekType.NON_SMOKED,
    price: 15.99,
    availableAmount: 3233,
    group: InventoryItemGroup.OSCYPEK,
  },
  {
    name: 'Oscypek',
    size: OscypekSize.MEDIUM,
    type: OscypekType.SMOKED,
    price: 14.99,
    availableAmount: 2233,
    group: InventoryItemGroup.OSCYPEK,
  },
  {
    name: 'Oscypek',
    size: OscypekSize.SMALL,
    type: OscypekType.NON_SMOKED,
    price: 10.99,
    availableAmount: 923,
    group: InventoryItemGroup.OSCYPEK,
  },
  {
    name: 'Oscypek',
    size: OscypekSize.SMALL,
    type: OscypekType.SMOKED,
    price: 9.99,
    availableAmount: 233,
    group: InventoryItemGroup.OSCYPEK,
  },
];

export function createOscypek(
  httpServer: any,
  name?: string,
  size?: OscypekSize,
  type?: OscypekType,
  price?: string,
  availableAmount?: number
) {
  return request(httpServer)
    .post('/inventory/oscypek/')
    .send({
      name: name ? name : `Oscypek ${faker.color.human()}`,
      size: size
        ? size
        : faker.helpers.arrayElement([
            OscypekSize.LARGE,
            OscypekSize.MEDIUM,
            OscypekSize.SMALL,
          ]),
      type: type
        ? type
        : faker.helpers.arrayElement([
            OscypekType.NON_SMOKED,
            OscypekType.SMOKED,
          ]),
      price: price
        ? price
        : faker.datatype
            .float({ min: 10, max: 100, precision: 0.1 })
            .toString(),
      availableAmount: availableAmount
        ? availableAmount
        : faker.datatype.number({ min: 500, max: 20000 }),
      group: InventoryItemGroup.OSCYPEK,
    });
}

export function deleteOscypek(httpServer: any, oscypekId: string) {
  return request(httpServer).delete(`/inventory/oscypek/${oscypekId}`);
}
