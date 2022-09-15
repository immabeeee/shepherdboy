import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderItemListComponent } from './order-item-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrderItemListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderItemListRoutingModule {}
