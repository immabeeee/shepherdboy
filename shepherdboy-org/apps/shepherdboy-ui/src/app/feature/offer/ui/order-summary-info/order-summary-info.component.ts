import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_LINK } from './../../../../model/route-link.model';
import { Observable } from 'rxjs';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { OrderView } from '../../data-access/state/offer.models';

@Component({
  selector: 'shepherdboy-org-order-summary-info',
  templateUrl: './order-summary-info.component.html',
  styleUrls: ['./order-summary-info.component.scss'],
})
export class OrderSummaryInfoComponent {
  public orderView$: Observable<OrderView> = this.offerStateFacade.orderView$;

  constructor(
    private offerStateFacade: OfferStateFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public openOrderPage(): void {
    this.router.navigate([`./${ROUTE_LINK.ORDER_DETAILS}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
