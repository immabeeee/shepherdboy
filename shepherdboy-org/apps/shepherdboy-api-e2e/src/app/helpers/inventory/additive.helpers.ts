import { faker } from '@faker-js/faker';
import { Additive, InventoryItemGroup } from '@shepherdboy-org/api-interfaces';
import * as request from 'supertest';

export const defaultAdditiveList: Additive[] = [
  {
    name: 'Cranberry sauce',
    price: 12.99,
    availableAmount: 444323,
    group: InventoryItemGroup.ADDITIVE,
  },
  {
    name: 'Garlic pesto',
    price: 8.99,
    availableAmount: 32332,
    group: InventoryItemGroup.ADDITIVE,
  },
];

export function createAdditive(
  httpServer: any,
  name?: string,
  price?: string,
  availableAmount?: number
) {
  return request(httpServer)
    .post('/inventory/additive')
    .send({
      name: name ? name : `Additive ${faker.color.human()}`,
      price: price
        ? price
        : faker.datatype
            .float({ min: 10, max: 100, precision: 0.1 })
            .toString(),
      availableAmount: availableAmount
        ? availableAmount
        : faker.datatype.number({ min: 500, max: 20000 }),
      group: InventoryItemGroup.ADDITIVE,
    });
}

export function deleteAdditive(httpServer: any, additiveId: string) {
  return request(httpServer).delete(`/inventory/additive/${additiveId}`);
}
