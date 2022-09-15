import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './order-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OscypekListFiltersModule } from '../order-list-filters/order-list-filters.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderDetailsDialogModule } from '../../feature/order-details-dialog/order-details-dialog.module';

const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    TranslateModule,
    OscypekListFiltersModule,
    OrderDetailsDialogModule,
    ...materialModules,
  ],
  exports: [OrderListComponent],
  providers: [],
})
export class OrderListModule {}
