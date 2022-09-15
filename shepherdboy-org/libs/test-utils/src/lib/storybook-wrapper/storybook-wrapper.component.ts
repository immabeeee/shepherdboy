import { Component } from '@angular/core';
import { toggleTheme, getStorageThemeValue } from '@shepherdboy-org/theme';

@Component({
  selector: 'shepherdboy-org-storybook-wrapper',
  templateUrl: './storybook-wrapper.component.html',
  styleUrls: ['./storybook-wrapper.component.scss'],
})
export class StorybookWrapperComponent {
  public currentTheme: string | null;

  constructor() {
    toggleTheme();
    this.currentTheme = getStorageThemeValue();
  }

  public handleChangeTheme(): void {
    toggleTheme();
    this.currentTheme = getStorageThemeValue();
  }
}
