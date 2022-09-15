import { NgModule } from '@angular/core';
import { OfferShellRoutingModule } from './offer-shell-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOffer from './../../data-access/state/offer.reducer';
import { OfferEffects } from './../../data-access/state/offer.effects';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { OfferRestService } from '../../data-access/offer.rest.service';
import { OfferService } from '../../data-access/offer.service';
import { OrderTranslateService } from '../../data-access/order-translate.service';

@NgModule({
  imports: [
    OfferShellRoutingModule,
    StoreModule.forFeature(fromOffer.OFFER_FEATURE_KEY, fromOffer.offerReducer),
    EffectsModule.forFeature([OfferEffects]),
  ],
  providers: [OfferStateFacade, OfferRestService, OfferService, OrderTranslateService],
})
export class OfferShellModule {}
