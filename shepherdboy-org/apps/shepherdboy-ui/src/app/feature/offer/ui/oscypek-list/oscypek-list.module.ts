import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OscypekListRoutingModule } from './oscypek-list-routing.module';
import { OscypekListComponent } from './oscypek-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { OscypekListFiltersModule } from '../oscypek-list-filters/oscypek-list-filters.module';
import { OscypekItemModule } from '../oscypek-item/oscypek-item.module';
import { UiProgressBarModule } from '@shepherdboy-org/ui-progress-bar';
import { UiMessageModule } from '@shepherdboy-org/ui-message';

@NgModule({
  declarations: [OscypekListComponent],
  imports: [
    CommonModule,
    OscypekListRoutingModule,
    TranslateModule,
    OscypekListFiltersModule,
    OscypekItemModule,
    UiProgressBarModule,
    UiMessageModule
  ],
  exports: [OscypekListComponent],
  providers: [],
})
export class OscypekListModule {}
