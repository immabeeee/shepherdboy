import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OscypekItemComponent } from './oscypek-item.component';

const routes: Routes = [
  {
    path: '',
    component: OscypekItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OscypekItemRoutingModule {}
