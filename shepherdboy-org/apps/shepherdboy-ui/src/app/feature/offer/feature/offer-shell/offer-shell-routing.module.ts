import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../offer-browser/offer-browser.page.module').then(
        (module) => module.OfferBrowserPageModule
      ),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('../order-details/order-details.page.module').then(
        (module) => module.OrderDetailsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferShellRoutingModule {}
