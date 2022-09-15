import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OscypekListComponent } from './oscypek-list.component';

const routes: Routes = [
  {
    path: '',
    component: OscypekListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OscypekListRoutingModule {}
