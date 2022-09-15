import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { UiIconButtonModule } from '@shepherdboy-org/ui-icon-button';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

const libModules = [UiIconButtonModule];
const materialModules = [MatButtonModule];

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ...materialModules,
    ...libModules,
  ],
  exports: [NavbarComponent],
  providers: [],
})
export class NavbarModule {}
