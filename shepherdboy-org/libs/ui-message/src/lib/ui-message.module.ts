import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMessageComponent } from './ui/ui-message.component';

@NgModule({
  declarations: [UiMessageComponent],
  imports: [CommonModule],
  exports: [UiMessageComponent]
})
export class UiMessageModule {}
