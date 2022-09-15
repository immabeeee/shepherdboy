import { Injectable } from '@angular/core';
import {
  CreateOrderRequest,
  OrderItem,
  ShippingDetails,
} from '@shepherdboy-org/api-interfaces';

@Injectable()
export class OrderTranslateService {
  public translateToCreateOrderRequest(
    shippingDetails: ShippingDetails | null,
    items: OrderItem[] | null
  ): CreateOrderRequest | undefined {
    if (!shippingDetails || !items) {
      return;
    }

    return {
      shippingDetails,
      items,
    };
  }
}
