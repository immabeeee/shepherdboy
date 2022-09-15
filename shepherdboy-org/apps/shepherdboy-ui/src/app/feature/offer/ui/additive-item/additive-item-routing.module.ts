import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditiveItemComponent } from './additive-item.component';

const routes: Routes = [
  {
    path: '',
    component: AdditiveItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditiveItemRoutingModule {}
