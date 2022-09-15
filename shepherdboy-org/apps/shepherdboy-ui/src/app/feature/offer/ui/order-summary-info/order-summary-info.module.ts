import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OrderSummaryInfoRoutingModule } from './order-summary-info-routing.module';
import { OrderSummaryInfoComponent } from './order-summary-info.component';
import { UiIconButtonModule } from '@shepherdboy-org/ui-icon-button';
import { MatTooltipModule } from '@angular/material/tooltip';

const materialModules = [MatTooltipModule];

@NgModule({
  declarations: [OrderSummaryInfoComponent],
  imports: [
    CommonModule,
    OrderSummaryInfoRoutingModule,
    TranslateModule,
    UiIconButtonModule,
    ...materialModules,
  ],
  exports: [OrderSummaryInfoComponent],
  providers: [],
})
export class OrderSummaryInfoModule {}
