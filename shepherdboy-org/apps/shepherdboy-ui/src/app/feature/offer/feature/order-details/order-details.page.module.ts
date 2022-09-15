import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OrderDetailsPageComponent } from './order-details.page';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrderItemModule } from '../../ui/order-item/order-item.module';
import { OrderDetailsPageRoutingModule } from './order-details-page-routing.module';
import { OrderSummaryInfoModule } from '../../ui/order-summary-info/order-summary-info.module';
import { UiMessageModule } from '@shepherdboy-org/ui-message';
import { UiShippingFormModule } from '@shepherdboy-org/ui-shipping-form';
import { UiProgressBarModule } from '@shepherdboy-org/ui-progress-bar';

const materialModules = [MatButtonModule, MatTooltipModule];
const libModules = [UiMessageModule, UiShippingFormModule, UiProgressBarModule];

@NgModule({
  declarations: [OrderDetailsPageComponent],
  imports: [
    CommonModule,
    TranslateModule,
    OrderDetailsPageRoutingModule,
    OrderItemModule,
    OrderSummaryInfoModule,
    ...materialModules,
    ...libModules,
  ],
  exports: [OrderDetailsPageComponent],
  providers: [],
  entryComponents: [OrderDetailsPageComponent],
})
export class OrderDetailsPageModule {}
