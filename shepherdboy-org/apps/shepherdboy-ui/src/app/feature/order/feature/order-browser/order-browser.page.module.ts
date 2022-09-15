import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { OrderBrowserPageRoutingModule } from './order-browser-page-routing.module';
import { OrderBrowserPageComponent } from './order-browser.page';
import { OrderListModule } from '../../ui/order-list/order-list.module';

@NgModule({
  declarations: [OrderBrowserPageComponent],
  imports: [
    CommonModule,
    OrderBrowserPageRoutingModule,
    TranslateModule,
    FormsModule,
    OrderListModule
  ],
  exports: [OrderBrowserPageComponent],
  providers: [],
})
export class OrderBrowserPageModule {}
