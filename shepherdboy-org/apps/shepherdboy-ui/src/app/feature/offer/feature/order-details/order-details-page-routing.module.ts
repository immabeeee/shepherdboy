import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { OrderDetailsPageComponent } from './order-details.page'

const routes: Routes = [
  {
    path: '',
    component: OrderDetailsPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailsPageRoutingModule {}
