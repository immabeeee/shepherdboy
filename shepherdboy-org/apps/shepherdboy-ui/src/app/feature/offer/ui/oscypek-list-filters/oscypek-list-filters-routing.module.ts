import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OscypekListFiltersComponent } from './oscypek-list-filters.component';

const routes: Routes = [
  {
    path: '',
    component: OscypekListFiltersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OscypekListFiltersRoutingModule {}
