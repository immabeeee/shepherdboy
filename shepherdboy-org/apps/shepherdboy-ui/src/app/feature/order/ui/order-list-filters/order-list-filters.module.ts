import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OrderListFiltersRoutingModule } from './order-list-filters-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { OrderListFiltersFormService } from '../../data-access/order-list-filters-form.service';
import { OrderListFiltersComponent } from './order-list-filters.component';
import { MatInputModule } from '@angular/material/input';

const materialModules = [MatSelectModule, MatInputModule];

@NgModule({
  declarations: [OrderListFiltersComponent],
  imports: [
    CommonModule,
    OrderListFiltersRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
  exports: [OrderListFiltersComponent],
  providers: [OrderListFiltersFormService],
})
export class OscypekListFiltersModule {}
