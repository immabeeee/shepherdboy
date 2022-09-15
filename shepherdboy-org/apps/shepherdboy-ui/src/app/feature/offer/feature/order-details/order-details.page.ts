import { Component } from '@angular/core';
import { Additive } from '@shepherdboy-org/api-interfaces';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { OfferService } from '../../data-access/offer.service';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import {
  CreateOrderView,
  OrderView,
  ShippingDetailsView,
} from '../../data-access/state/offer.models';
import { ShippingDetailsFormValue } from '@shepherdboy-org/ui-shipping-form';

export interface DialogData {
  orderView: OrderView;
}

@Component({
  selector: 'shepherdboy-org-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPageComponent {
  public createOrderView$: Observable<CreateOrderView> =
    this.offerStateFacade.createOrderView$;
  public orderView$: Observable<OrderView> = this.offerStateFacade.orderView$;
  public shippingDetailsView$: Observable<ShippingDetailsView> =
    this.offerStateFacade.shippingDetailsView$;
  public isOrderValid$: Observable<boolean> = combineLatest([
    this.offerStateFacade.orderView$,
    this.offerStateFacade.shippingDetailsView$,
  ]).pipe(
    switchMap(([a, b]) => {
      return of(!!a.items && a.items.length > 0 && !!b.details);
    })
  );

  public selectedAdditives: Additive[] = [];

  constructor(
    private offerStateFacade: OfferStateFacade,
    private offerService: OfferService
  ) {}

  public handleSubmitResult(formValue: ShippingDetailsFormValue): void {
    this.offerService.updateShippingDetails(formValue);
  }

  public createOrder(): void {
    this.offerService.createOrder();
  }
}
