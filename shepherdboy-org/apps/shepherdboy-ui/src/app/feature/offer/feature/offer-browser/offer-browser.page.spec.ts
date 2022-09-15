import { TestBed, ComponentFixture } from '@angular/core/testing';
import * as testData from '@shepherdboy-org/test-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { By } from '@angular/platform-browser';
import { MockSelector, provideMockStore } from '@ngrx/store/testing';
import { getAdditiveListView } from '../../data-access/state/offer.selectors';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import { OfferService } from '../../data-access/offer.service';
import { OfferBrowserPageComponent } from './offer-browser.page';
import { OfferBrowserPageModule } from './offer-browser.page.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let fixture: ComponentFixture<OfferBrowserPageComponent>;
let component: OfferBrowserPageComponent;

describe('OfferBrowserPageComponent', () => {
  it('should display a offer page', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getAdditiveListView,
        value: {
          items: [testData.oscypek],
          isLoading: true,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
    ]);

    fixture.detectChanges();

    // when
    const { list, summaryInfo } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(list).not.toBeDefined();
    expect(summaryInfo).not.toBeDefined();
  });
});

function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
  TestBed.configureTestingModule({
    declarations: [OfferBrowserPageComponent],
    imports: [
      RouterTestingModule.withRoutes([]),
      BrowserAnimationsModule,
      OfferBrowserPageModule,
      TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
    ],
    providers: [
      OfferService,
      OfferStateFacade,
      provideMockStore({
        selectors: selectors,
      }),
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(OfferBrowserPageComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

function getDOMElements() {
  const list: HTMLElement = fixture.debugElement.query(
    By.css(
      `shepherdboy-org-offer-oscypek-list[data-test-id="org-oscypek-list-container]`
    )
  )?.nativeElement;
  const summaryInfo: HTMLElement = fixture.debugElement.query(
    By.css(
      `shepherdboy-org-order-summary-info[data-test-id="org-order-summary-info-container]`
    )
  )?.nativeElement;

  return {
    list,
    summaryInfo,
  };
}
