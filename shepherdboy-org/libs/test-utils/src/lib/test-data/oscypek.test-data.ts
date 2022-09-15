import {
  InventoryItemGroup,
  Oscypek,
  OscypekSize,
  OscypekType,
} from '@shepherdboy-org/api-interfaces';

export const oscypek: Oscypek = {
  id: '1',
  createdAt: new Date(2022, 10, 14, 11, 0, 0, 0),
  updatedAt: new Date(2022, 10, 14, 11, 0, 0, 0),
  availableAmount: 1000,
  name: 'Test oscypek',
  price: 43.23,
  group: InventoryItemGroup.OSCYPEK,
  size: OscypekSize.LARGE,
  type: OscypekType.NON_SMOKED,
};
