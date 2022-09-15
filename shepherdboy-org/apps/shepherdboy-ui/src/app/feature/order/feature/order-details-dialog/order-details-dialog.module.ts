import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OrderDetailsDialogComponent } from './order-details-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UiShippingFormModule } from '@shepherdboy-org/ui-shipping-form';
import { UiMessageModule } from '@shepherdboy-org/ui-message';
import { OrderItemListModule } from '../../ui/order-item-list/order-item-list.module';

const materialModules = [MatDialogModule, MatButtonModule, MatTooltipModule];
const libModules = [UiShippingFormModule, UiMessageModule];

@NgModule({
  declarations: [OrderDetailsDialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    OrderItemListModule,
    ...materialModules,
    ...libModules,
  ],
  exports: [OrderDetailsDialogComponent],
  providers: [],
  entryComponents: [OrderDetailsDialogComponent],
})
export class OrderDetailsDialogModule {}
