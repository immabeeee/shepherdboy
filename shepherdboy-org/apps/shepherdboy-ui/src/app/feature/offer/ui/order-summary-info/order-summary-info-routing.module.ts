import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSummaryInfoComponent } from './order-summary-info.component';

const routes: Routes = [
  {
    path: '',
    component: OrderSummaryInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSummaryInfoRoutingModule {}
