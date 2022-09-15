import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OscypekItemRoutingModule } from './oscypek-item-routing.module';
import { OscypekItemComponent } from './oscypek-item.component';
import { MatChipsModule } from '@angular/material/chips';
import { AdditiveDialogModule } from '../../feature/additive-dialog/additive-dialog.module';

const materialModules = [MatChipsModule];

@NgModule({
  declarations: [OscypekItemComponent],
  imports: [
    CommonModule,
    OscypekItemRoutingModule,
    TranslateModule,
    AdditiveDialogModule,
    ...materialModules,
  ],
  exports: [OscypekItemComponent],
  providers: [],
})
export class OscypekItemModule {}
