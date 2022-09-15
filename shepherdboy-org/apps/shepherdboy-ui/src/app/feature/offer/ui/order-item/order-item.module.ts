import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OrderItemRoutingModule } from './order-item-routing.module';
import { OrderItemComponent } from './order-item.component';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderItemFormService } from '../../data-access/order-item-form.service';
import { AdditiveDialogModule } from '../../feature/additive-dialog/additive-dialog.module';
import { UiMessageModule } from '@shepherdboy-org/ui-message';
const libModules = [UiMessageModule];

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [OrderItemComponent],
  imports: [
    CommonModule,
    OrderItemRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    AdditiveDialogModule,
    ...materialModules,
    ...libModules,
  ],
  exports: [OrderItemComponent],
  providers: [OrderItemFormService],
})
export class OrderItemModule {}
