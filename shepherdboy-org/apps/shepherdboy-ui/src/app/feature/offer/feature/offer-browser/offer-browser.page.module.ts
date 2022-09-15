import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OfferBrowserPageRoutingModule } from './offer-browser-page-routing.module';
import { OfferBrowserPageComponent } from './offer-browser.page';
import { TranslateModule } from '@ngx-translate/core';
import { OscypekListModule } from '../../ui/oscypek-list/oscypek-list.module';
import { OrderSummaryInfoModule } from '../../ui/order-summary-info/order-summary-info.module';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';

const materialModules = [MatSidenavModule];

@NgModule({
  declarations: [OfferBrowserPageComponent],
  imports: [
    CommonModule,
    OfferBrowserPageRoutingModule,
    TranslateModule,
    OscypekListModule,
    OrderSummaryInfoModule,
    FormsModule,
    ...materialModules,
  ],
  exports: [OfferBrowserPageComponent],
  providers: [MatSidenavContainer],
})
export class OfferBrowserPageModule {}
