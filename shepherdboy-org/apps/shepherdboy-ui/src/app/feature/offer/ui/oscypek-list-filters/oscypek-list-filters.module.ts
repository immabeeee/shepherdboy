import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OscypekListFiltersRoutingModule } from './oscypek-list-filters-routing.module';
import { OscypekListFiltersComponent } from './oscypek-list-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { OscypekListFiltersFormService } from '../../data-access/ocsypek-list-filters-form.service';

const materialModules = [MatSelectModule];

@NgModule({
  declarations: [OscypekListFiltersComponent],
  imports: [
    CommonModule,
    OscypekListFiltersRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
  exports: [OscypekListFiltersComponent],
  providers: [OscypekListFiltersFormService],
})
export class OscypekListFiltersModule {}
