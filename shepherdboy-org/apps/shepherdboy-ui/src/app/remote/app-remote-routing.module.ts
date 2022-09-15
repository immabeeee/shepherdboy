import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_LINK } from '../model/route-link.model';
import { AppRemoteComponent } from './app-remote.component';

const routes: Routes = [
  {
    path: '',
    component: AppRemoteComponent,
    title: 'Shepherdboy 🍠',
    children: [
      {
        path: '',
        redirectTo: ROUTE_LINK.OFFER,
        pathMatch: 'full',
      },
      {
        path: ROUTE_LINK.OFFER,
        loadChildren: () =>
          import(
            '../feature/offer/feature/offer-shell/offer-shell.module'
          ).then((module) => module.OfferShellModule),
        title: 'Our products 🍠',
      },
      {
        path: ROUTE_LINK.ORDER_REGISTRY,
        loadChildren: () =>
          import(
            '../feature/order/feature/order-shell/order-shell.module'
          ).then((module) => module.OrderShellModule),
        title: 'Orders 🚛',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRemoteRoutingModule {}
