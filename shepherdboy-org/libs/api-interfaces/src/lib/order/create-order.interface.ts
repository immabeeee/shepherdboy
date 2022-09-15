import { Order, OrderItem, ShippingDetails } from './order.interface';

export interface CreateOrderRequest {
  shippingDetails: ShippingDetails;
  items: OrderItem[];
}

export interface CreateOrderResponse {
  order: Order;
}
