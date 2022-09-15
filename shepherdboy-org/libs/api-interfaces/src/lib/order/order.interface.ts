import { Additive } from '../inventory/additive/additive.inferface';
import { InventoryItemGroup } from '../inventory/inventory-item.interface';
import {
  Oscypek,
  OscypekSize,
  OscypekType,
} from '../inventory/oscypek/oscypek.inferface';

export interface Order {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: ORDER_STATUS;
  shippingDetails: ShippingDetails;
  items: OrderItemDetails[];
}

export enum ORDER_STATUS {
  NEW = 'NEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface OrderItemAdditiveDetails {
  id: string;
  quantity: number;
  group: InventoryItemGroup;
  name: string;
  orderId: string;
  orderItemId: string;
  price: number;
}

export interface OrderItemDetails {
  id: string;
  quantity: number;
  group: InventoryItemGroup;
  name: string;
  orderId: string;
  price: number;
  size: OscypekSize;
  type: OscypekType;
  orderItemAdditives: OrderItemAdditiveDetails[];
}

export interface OscypekOrderItem extends Oscypek {
  quantity: number;
  orderId?: string;
}

export interface AdditiveOrderItem extends Additive {
  quantity: number;
}

export interface OrderItem {
  oscypek: OscypekOrderItem;
  additives: AdditiveOrderItem[];
}

export interface ShippingDetails {
  id?: string;
  firstName: string;
  lastName: string;
  city: string;
  zipCode: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
}
