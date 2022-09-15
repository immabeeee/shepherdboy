import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { OfferBrowserPageComponent } from './offer-browser.page'

const routes: Routes = [
  {
    path: '',
    component: OfferBrowserPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferBrowserPageRoutingModule {}
