import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShippingDetailsFormComponent } from './shipping-details-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShippingDetailsFormService } from '../../data-access/shipping-details-form.service';
import { TextMaskModule } from 'angular2-text-mask';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [ShippingDetailsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TextMaskModule,
    ...materialModules,
  ],
  exports: [ShippingDetailsFormComponent],
  providers: [ShippingDetailsFormService],
})
export class ShippingDetailsFormModule {}
