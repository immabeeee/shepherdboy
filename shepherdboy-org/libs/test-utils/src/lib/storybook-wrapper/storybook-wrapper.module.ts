import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StorybookWrapperComponent } from './storybook-wrapper.component';
import { UiIconButtonModule } from '@shepherdboy-org/ui-icon-button';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

const libModules = [UiIconButtonModule];
const materialModules = [MatButtonModule];

@NgModule({
  declarations: [StorybookWrapperComponent],
  imports: [CommonModule, TranslateModule, ...materialModules, ...libModules],
  exports: [StorybookWrapperComponent],
  providers: [],
})
export class StorybookWrapperModule {}
