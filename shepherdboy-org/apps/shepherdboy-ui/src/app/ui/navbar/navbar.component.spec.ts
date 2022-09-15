import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { NavbarComponent } from './navbar.component';
import { NavbarModule } from './navbar.module';
import * as testData from '@shepherdboy-org/test-utils';

describe('NavbarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        NavbarModule,
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display application logo', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const logo = fixture.debugElement.query(
      By.css('img[data-test-id="org-nav-logo"]')
    );
    expect(logo).toBeTruthy();
  });

  it('should display navigation menu', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const ul = fixture.debugElement.query(
      By.css('ul[data-test-id="org-nav-menu-list"]')
    );
    expect(ul).toBeTruthy();
  });

  it('should display navigation menu items', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const ul = fixture.debugElement.queryAll(By.css('li'));
    const item1: HTMLAnchorElement = fixture.debugElement.query(
      By.css('a[data-test-id="org-nav-menu-link-offer"]')
    ).nativeElement;
    const item2: HTMLAnchorElement = fixture.debugElement.query(
      By.css('a[data-test-id="org-nav-menu-link-order-registry"]')
    ).nativeElement;

    fixture.detectChanges();

    expect(ul).toBeTruthy();
    expect(ul.length).toBe(1);

    expect(item1).toBeTruthy();
    expect(item1.textContent).toBe('Our products');

    expect(item2).toBeTruthy();
    expect(item2.textContent).toBe('Order List');
  });

  it('should display menu buttons', () => {
    const fixture = TestBed.createComponent(NavbarComponent);

    const themeButton: HTMLElement = fixture.debugElement.query(
      By.css(
        'shepherdboy-org-ui-icon-button[data-test-id="org-nav-menu-theme-button"]'
      )
    )?.nativeElement;

    const langButton: HTMLElement = fixture.debugElement.query(
      By.css(
        'shepherdboy-org-ui-icon-button[data-test-id="org-nav-menu-lang-button"]'
      )
    )?.nativeElement;

    fixture.detectChanges();

    expect(themeButton).toBeTruthy();
    expect(themeButton.textContent).toBe('');
    expect(langButton).toBeTruthy();
    expect(langButton.textContent).toBe('');
  });
});
