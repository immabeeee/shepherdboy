import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from '../ui/navbar/navbar.module';
import { AppRemoteRoutingModule } from './app-remote-routing.module';
import { AppRemoteComponent } from './app-remote.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [AppRemoteComponent],
  imports: [
    CommonModule,
    AppRemoteRoutingModule,
    NavbarModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [],
  providers: [],
})
export class AppRemoteModule {}
