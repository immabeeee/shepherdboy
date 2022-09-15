import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { OscypekListView } from '../../data-access/state/offer.models';

@Component({
  selector: 'shepherdboy-org-offer-oscypek-list',
  templateUrl: './oscypek-list.component.html',
  styleUrls: ['./oscypek-list.component.scss'],
})
export class OscypekListComponent {
  public osycpekListView$: Observable<OscypekListView> =
    this.offerStateFacade.osycpekListView$;

  constructor(private offerStateFacade: OfferStateFacade) {}
}
