import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderItemListRoutingModule } from './order-item-list-routing.module';
import { OrderItemListComponent } from './order-item-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [OrderItemListComponent],
  imports: [
    CommonModule,
    OrderItemListRoutingModule,
    TranslateModule,
    ...materialModules,
  ],
  exports: [OrderItemListComponent],
  providers: [],
})
export class OrderItemListModule {}
