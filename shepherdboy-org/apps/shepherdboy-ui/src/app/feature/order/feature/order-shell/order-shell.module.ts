import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOrder from '../../data-access/state/order.reducer';
import { OrderRestService } from '../../data-access/order.rest.service';
import { OrderEffects } from '../../data-access/state/order.effects';
import { OrderStateFacade } from '../../data-access/state/order.facade';
import { OrderShellRoutingModule } from './order-shell-routing.module';
import { OrderService } from '../../data-access/order.service';

@NgModule({
  imports: [
    OrderShellRoutingModule,
    StoreModule.forFeature(fromOrder.ORDER_FEATURE_KEY, fromOrder.orderReducer),
    EffectsModule.forFeature([OrderEffects]),
  ],
  providers: [OrderRestService, OrderService, OrderStateFacade],
})
export class OrderShellModule {}
