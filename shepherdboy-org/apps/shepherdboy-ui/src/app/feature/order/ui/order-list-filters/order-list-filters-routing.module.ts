import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListFiltersComponent } from './order-list-filters.component';

const routes: Routes = [
  {
    path: '',
    component: OrderListFiltersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderListFiltersRoutingModule {}
