import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AdditiveItemRoutingModule } from './additive-item-routing.module';
import { AdditiveItemComponent } from './additive-item.component';

@NgModule({
  declarations: [AdditiveItemComponent],
  imports: [CommonModule, AdditiveItemRoutingModule, TranslateModule],
  exports: [AdditiveItemComponent],
  providers: [],
})
export class AdditiveItemModule {}
