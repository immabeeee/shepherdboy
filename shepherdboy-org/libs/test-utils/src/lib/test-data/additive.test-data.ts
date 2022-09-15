import { Additive, InventoryItemGroup } from '@shepherdboy-org/api-interfaces';

export const additive: Additive = {
  id: '1',
  createdAt: new Date(2022, 10, 14, 11, 0, 0, 0),
  updatedAt: new Date(2022, 10, 14, 11, 0, 0, 0),
  availableAmount: 1000,
  name: 'Test additive',
  price: 43.23,
  group: InventoryItemGroup.ADDITIVE,
};
