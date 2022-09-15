import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AdditiveDialogComponent } from './additive-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdditiveItemModule } from '../../ui/additive-item/additive-item.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UiProgressBarModule } from '@shepherdboy-org/ui-progress-bar';
import { UiMessageModule } from '@shepherdboy-org/ui-message';

const materialModules = [MatDialogModule, MatButtonModule, MatTooltipModule];

@NgModule({
  declarations: [AdditiveDialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    AdditiveItemModule,
    UiProgressBarModule,
    UiMessageModule,
    ...materialModules,
  ],
  exports: [AdditiveDialogComponent],
  providers: [],
  entryComponents: [AdditiveDialogComponent],
})
export class AdditiveDialogModule {}
