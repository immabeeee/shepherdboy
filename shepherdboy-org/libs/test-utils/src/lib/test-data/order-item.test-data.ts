import { OrderItem } from '@shepherdboy-org/api-interfaces';
import { oscypek } from './oscypek.test-data';
import { additive } from './additive.test-data';

export const orderItem: OrderItem = {
  oscypek: {
    ...oscypek,
    quantity: 12,
  },
  additives: [{ ...additive, quantity: 12 }],
};
