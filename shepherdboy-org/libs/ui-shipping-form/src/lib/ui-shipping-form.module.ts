import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingDetailsFormModule } from './ui/shipping-details-form/shipping-details-form.module';
import { ShippingDetailsFormComponent } from './ui/shipping-details-form/shipping-details-form.component';

@NgModule({
  imports: [CommonModule, ShippingDetailsFormModule],
  exports: [ShippingDetailsFormComponent]
})
export class UiShippingFormModule {}
