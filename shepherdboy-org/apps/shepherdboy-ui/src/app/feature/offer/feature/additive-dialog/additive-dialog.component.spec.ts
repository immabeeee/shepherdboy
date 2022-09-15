import { TestBed, ComponentFixture } from '@angular/core/testing';
import * as testData from '@shepherdboy-org/test-utils';
import { ChangeDetectionStrategy } from '@angular/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MockSelector, provideMockStore } from '@ngrx/store/testing';
import { getAdditiveListView } from '../../data-access/state/offer.selectors';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import {
  generateDefaultListQuery,
  Oscypek,
} from '@shepherdboy-org/api-interfaces';
import { OfferService } from '../../data-access/offer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdditiveDialogModule } from './additive-dialog.module';
import { AdditiveDialogComponent } from './additive-dialog.component';

let fixture: ComponentFixture<AdditiveDialogComponent>;
let component: AdditiveDialogComponent;
const offerServiceMock = {
  fetchAdditiveList: jest.fn(),
};

describe('AdditiveDialogComponent', () => {
  it('should display a progress bar when list is loading', () => {
    // given
    configureTestingModuleWithProvidedSelector(
      [
        {
          selector: getAdditiveListView,
          value: {
            items: null,
            isLoading: true,
            error: null,
            listQuery: generateDefaultListQuery(),
          },
        },
      ],
      { oscypek: testData.oscypek }
    );

    fixture.detectChanges();

    // when
    const {
      dialogTitle,
      dialogDecription,
      additiveList,
      closeButton,
      addButton,
      progressBar,
      errorMessage,
      emptyMessage,
    } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(dialogTitle).toBeDefined();
    expect(dialogDecription).toBeDefined();
    expect(closeButton).toBeDefined();
    expect(addButton).toBeDefined();
    expect(addButton.disabled).toBe(true);
    expect(additiveList).not.toBeDefined();
    expect(progressBar).toBeDefined();
    expect(errorMessage).not.toBeDefined();
    expect(emptyMessage).not.toBeDefined();
  });

  it('should display an empty message loaded list is empty', () => {
    // given
    configureTestingModuleWithProvidedSelector(
      [
        {
          selector: getAdditiveListView,
          value: {
            items: [],
            isLoading: false,
            error: null,
            listQuery: generateDefaultListQuery(),
          },
        },
      ],
      { oscypek: testData.oscypek }
    );

    fixture.detectChanges();

    // when
    const {
      dialogTitle,
      dialogDecription,
      additiveList,
      closeButton,
      addButton,
      progressBar,
      errorMessage,
      emptyMessage,
    } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(dialogTitle).toBeDefined();
    expect(dialogDecription).toBeDefined();
    expect(closeButton).toBeDefined();
    expect(addButton).toBeDefined();
    expect(addButton.disabled).toBe(true);
    expect(additiveList).not.toBeDefined();
    expect(progressBar).not.toBeDefined();
    expect(errorMessage).not.toBeDefined();
    expect(emptyMessage).toBeDefined();
  });

  it('should display an error message when loading failed', () => {
    // given
    configureTestingModuleWithProvidedSelector(
      [
        {
          selector: getAdditiveListView,
          value: {
            items: null,
            isLoading: false,
            error: 'test error',
            listQuery: generateDefaultListQuery(),
          },
        },
      ],
      { oscypek: testData.oscypek }
    );

    fixture.detectChanges();

    // when
    const {
      dialogTitle,
      dialogDecription,
      additiveList,
      closeButton,
      addButton,
      progressBar,
      errorMessage,
      emptyMessage,
    } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(dialogTitle).toBeDefined();
    expect(dialogDecription).toBeDefined();
    expect(closeButton).toBeDefined();
    expect(addButton).toBeDefined();
    expect(addButton.disabled).toBe(true);
    expect(additiveList).not.toBeDefined();
    expect(progressBar).not.toBeDefined();
    expect(errorMessage).toBeDefined();
    expect(emptyMessage).not.toBeDefined();
  });

  it('should display a add-ons list', () => {
    // given
    configureTestingModuleWithProvidedSelector(
      [
        {
          selector: getAdditiveListView,
          value: {
            items: [testData.additive],
            isLoading: false,
            error: null,
            listQuery: generateDefaultListQuery(),
          },
        },
      ],
      { oscypek: testData.oscypek }
    );

    fixture.detectChanges();

    // when
    const {
      dialogTitle,
      dialogDecription,
      additiveList,
      closeButton,
      addButton,
      progressBar,
      errorMessage,
      emptyMessage,
    } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(dialogTitle).toBeDefined();
    expect(dialogDecription).toBeDefined();
    expect(closeButton).toBeDefined();
    expect(addButton).toBeDefined();
    expect(addButton.disabled).toBe(true);
    expect(additiveList).toBeDefined();
    expect(progressBar).not.toBeDefined();
    expect(errorMessage).not.toBeDefined();
    expect(emptyMessage).not.toBeDefined();
  });
});

function configureTestingModuleWithProvidedSelector(
  selectors: MockSelector[],
  dialogData: { oscypek: Oscypek }
) {
  TestBed.configureTestingModule({
    declarations: [AdditiveDialogComponent],
    imports: [
      AdditiveDialogModule,
      TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
    ],
    providers: [
      OfferService,
      OfferStateFacade,
      { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: dialogData },
      provideMockStore({
        selectors: selectors,
      }),
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(AdditiveDialogComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

function getDOMElements() {
  const dialogTitle: HTMLHeadingElement = fixture.debugElement.query(
    By.css(`h1[data-test-id="org-additive-dialog-title"]`)
  )?.nativeElement;
  const dialogDecription: HTMLParagraphElement = fixture.debugElement.query(
    By.css(`p[data-test-id="org-additive-dialog-description"]`)
  )?.nativeElement;
  const additiveList: HTMLElement = fixture.debugElement.query(
    By.css(`div[data-test-id="org-additive-dialog-list"]`)
  )?.nativeElement;
  const closeButton: HTMLButtonElement = fixture.debugElement.query(
    By.css(`button[data-test-id="org-additive-dialog-close-button"]`)
  )?.nativeElement;
  const addButton: HTMLButtonElement = fixture.debugElement.query(
    By.css(`button[data-test-id="org-additive-dialog-add-button"]`)
  )?.nativeElement;
  const progressBar: HTMLElement = fixture.debugElement.query(
    By.css(
      `shepherdboy-org-ui-progress-bar[data-test-id="org-additive-dialog-list-progress-bar"]`
    )
  )?.nativeElement;
  const errorMessage: HTMLElement = fixture.debugElement.query(
    By.css(
      `shepherdboy-org-ui-message[data-test-id="org-additive-dialog-list-error-message"]`
    )
  )?.nativeElement;
  const emptyMessage: HTMLElement = fixture.debugElement.query(
    By.css(
      `shepherdboy-org-ui-message[data-test-id="org-additive-dialog-list-empty-message"]`
    )
  )?.nativeElement;

  // shepherdboy-org-offer-additive-item org-additive-dialog-list-item

  return {
    dialogTitle,
    dialogDecription,
    additiveList,
    closeButton,
    addButton,
    progressBar,
    errorMessage,
    emptyMessage,
  };
}
