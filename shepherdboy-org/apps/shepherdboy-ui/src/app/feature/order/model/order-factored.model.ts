import {
  ShippingDetails,
  OrderItemDetails,
  ORDER_STATUS,
} from '@shepherdboy-org/api-interfaces';

export interface OrderFactored {
  shippingDetails: ShippingDetails;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  items: OrderItemDetails[];
  itemsQuantity: number;
  itemsAmount: number;
  status: ORDER_STATUS;
}
