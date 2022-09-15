import { TestBed, ComponentFixture } from '@angular/core/testing';
import * as testData from '@shepherdboy-org/test-utils';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MockSelector, provideMockStore } from '@ngrx/store/testing';
import {
  getAdditiveListView,
  getOscypekListView,
} from '../../data-access/state/offer.selectors';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import { OfferService } from '../../data-access/offer.service';
import { OscypekListComponent } from './oscypek-list.component';
import { OscypekListModule } from './oscypek-list.module';

let fixture: ComponentFixture<OscypekListComponent>;
let component: OscypekListComponent;
const offerServiceMock = {
  addOrderItem: jest.fn(),
  fetchOscypekList: jest.fn(),
};

describe('OscypekListComponent', () => {
  it('should display a progress bar while list is loading', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getAdditiveListView,
        value: {
          items: [testData.additive],
          isLoading: false,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
      {
        selector: getOscypekListView,
        value: {
          items: null,
          isLoading: true,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
    ]);

    fixture.detectChanges();

    // when
    const {
      container,
      title,
      filters,
      progressBar,
      errorMessage,
      emptyMessage,
      list,
    } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(container).toBeDefined();
    expect(title).toBeDefined();
    expect(filters).toBeDefined();
    expect(progressBar).toBeDefined();
    expect(errorMessage).not.toBeDefined();
    expect(emptyMessage).not.toBeDefined();
    expect(list).not.toBeDefined();
  });

  it('should display an erorr message while loading failed', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getAdditiveListView,
        value: {
          items: [testData.additive],
          isLoading: false,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
      {
        selector: getOscypekListView,
        value: {
          items: null,
          isLoading: false,
          error: 'test error',
          listQuery: generateDefaultListQuery(),
        },
      },
    ]);

    fixture.detectChanges();

    // when
    const {
      container,
      title,
      filters,
      progressBar,
      errorMessage,
      emptyMessage,
      list,
    } = getDOMElements();

    const messageParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css(
        'shepherdboy-org-ui-message[data-test-id="org-oscypek-list-error-message"] * p'
      )
    )?.nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(container).toBeDefined();
    expect(title).toBeDefined();
    expect(filters).toBeDefined();
    expect(progressBar).not.toBeDefined();
    expect(errorMessage).toBeDefined();
    expect(messageParagraph.textContent).toContain('test error');
    expect(emptyMessage).not.toBeDefined();
    expect(list).not.toBeDefined();
  });

  it('should display an empty message when loaded list is empty', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getAdditiveListView,
        value: {
          items: [testData.additive],
          isLoading: false,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
      {
        selector: getOscypekListView,
        value: {
          items: [],
          isLoading: false,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
    ]);

    fixture.detectChanges();

    // when
    const {
      container,
      title,
      filters,
      progressBar,
      errorMessage,
      emptyMessage,
      list,
    } = getDOMElements();

    const messageParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css(
        'shepherdboy-org-ui-message[data-test-id="org-oscypek-list-empty-message"] * p'
      )
    )?.nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(container).toBeDefined();
    expect(title).toBeDefined();
    expect(filters).toBeDefined();
    expect(progressBar).not.toBeDefined();
    expect(errorMessage).not.toBeDefined();
    expect(emptyMessage).toBeDefined();
    expect(messageParagraph.textContent).toContain('There is no oscypek');
    expect(list).not.toBeDefined();
  });

  it('should display a list', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getAdditiveListView,
        value: {
          items: [testData.additive],
          isLoading: false,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
      {
        selector: getOscypekListView,
        value: {
          items: [testData.oscypek],
          isLoading: false,
          error: null,
          listQuery: generateDefaultListQuery(),
        },
      },
    ]);

    fixture.detectChanges();

    // when
    const {
      container,
      title,
      filters,
      progressBar,
      errorMessage,
      emptyMessage,
      list,
    } = getDOMElements();

    const listElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('div[data-test-id="org-oscypek-list-container"]')
    );

    // then
    expect(component).toBeTruthy();
    expect(container).toBeDefined();
    expect(title).toBeDefined();
    expect(filters).toBeDefined();
    expect(progressBar).not.toBeDefined();
    expect(errorMessage).not.toBeDefined();
    expect(emptyMessage).not.toBeDefined();
    expect(list).toBeDefined();
    expect(listElements.length).toBe(1);
  });
});

function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
  TestBed.configureTestingModule({
    declarations: [OscypekListComponent],
    imports: [
      OscypekListModule,
      TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
      BrowserAnimationsModule,
    ],
    providers: [
      { provide: OfferService, useValue: offerServiceMock },
      OfferStateFacade,
      provideMockStore({
        selectors: selectors,
      }),
    ],
  })
    .overrideComponent(OscypekListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();

  fixture = TestBed.createComponent(OscypekListComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

function getDOMElements() {
  const container: HTMLElement = fixture.debugElement.query(
    By.css('div[data-test-id="org-oscypek-list-container"]')
  )?.nativeElement;

  const title: HTMLHeadingElement = fixture.debugElement.query(
    By.css('h1[data-test-id="org-oscypek-list-title"]')
  )?.nativeElement;

  const filters: HTMLElement = fixture.debugElement.query(
    By.css(
      'shepherdboy-org-offer-oscypek-list-filters[data-test-id="org-oscypek-list-filters"]'
    )
  )?.nativeElement;

  const progressBar: HTMLElement = fixture.debugElement.query(
    By.css(
      'shepherdboy-org-ui-progress-bar[data-test-id="org-oscypek-list-progress-bar"]'
    )
  )?.nativeElement;

  const errorMessage: HTMLElement = fixture.debugElement.query(
    By.css(
      'shepherdboy-org-ui-message[data-test-id="org-oscypek-list-error-message"]'
    )
  )?.nativeElement;

  const emptyMessage: HTMLElement = fixture.debugElement.query(
    By.css(
      'shepherdboy-org-ui-message[data-test-id="org-oscypek-list-empty-message"]'
    )
  )?.nativeElement;

  const list: HTMLElement = fixture.debugElement.query(
    By.css('div[data-test-id="org-oscypek-list"]')
  )?.nativeElement;

  return {
    container,
    title,
    filters,
    progressBar,
    errorMessage,
    emptyMessage,
    list,
  };
}
