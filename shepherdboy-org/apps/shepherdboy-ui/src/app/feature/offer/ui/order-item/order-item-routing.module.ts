import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderItemComponent } from './order-item.component';

const routes: Routes = [
  {
    path: '',
    component: OrderItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderItemRoutingModule {}
