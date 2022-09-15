import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { OrderBrowserPageComponent } from './order-browser.page'

const routes: Routes = [
  {
    path: '',
    component: OrderBrowserPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderBrowserPageRoutingModule {}
