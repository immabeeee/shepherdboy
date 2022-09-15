import { Component } from '@angular/core';
import { toggleTheme, getStorageThemeValue } from '@shepherdboy-org/theme';
import { TranslateService } from '@ngx-translate/core';
import { ROUTE_LINK } from '../../model/route-link.model';

@Component({
  selector: 'shepherdboy-org-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public currentTheme: string | null;
  public currentLang: 'pl' | 'us' = 'us';
  public readonly langs: ('pl' | 'us')[] = ['pl', 'us'];
  public readonly ROUTE_LINK: typeof ROUTE_LINK = ROUTE_LINK;

  constructor(public translateService: TranslateService) {
    this.currentTheme = getStorageThemeValue();
    this.translateService.addLangs(Object.keys(this.langs));
    this.translateService.setDefaultLang('us');
  }

  public toggleLang() {
    const newLang = this.currentLang === 'pl' ? 'us' : 'pl';
    this.translateService.use(newLang);
    this.currentLang = newLang;
  }

  public handleChangeTheme(): void {
    toggleTheme();
    this.currentTheme = getStorageThemeValue();
  }
}
