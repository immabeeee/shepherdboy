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

export const anotherOrderItem: OrderItem = {
  oscypek: {
    ...{ ...oscypek, id: 'lorem0', price: 13.33 },
    quantity: 5,
  },
  additives: [
    { ...{ ...additive, id: 'lorem', price: 20.23 }, quantity: 2 },
    { ...{ ...additive, id: 'lorem2', price: 23.23 }, quantity: 5 },
  ],
};
