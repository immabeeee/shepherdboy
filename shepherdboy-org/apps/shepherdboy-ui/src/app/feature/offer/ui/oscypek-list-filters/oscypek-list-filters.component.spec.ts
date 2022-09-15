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
import { OscypekListFiltersComponent } from './oscypek-list-filters.component';
import { OscypekListFiltersModule } from './oscypek-list-filters.module';

let fixture: ComponentFixture<OscypekListFiltersComponent>;
let component: OscypekListFiltersComponent;
const offerServiceMock = {
  addOrderItem: jest.fn(),
  fetchOscypekList: jest.fn(),
};

describe('OscypekListFiltersComponent', () => {
  it('should display a progress bar while list is loading', () => {
    // given
    configureTestingModuleWithProvidedSelector([
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
    const { typeLabel, typeSelect, sizeLabel, sizeSelect } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(typeLabel).toBeDefined();
    expect(typeSelect).toBeDefined();
    expect(sizeLabel).toBeDefined();
    expect(sizeSelect).toBeDefined();
  });
});

function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
  TestBed.configureTestingModule({
    declarations: [OscypekListFiltersComponent],
    imports: [
      OscypekListFiltersModule,
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
    .overrideComponent(OscypekListFiltersComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();

  fixture = TestBed.createComponent(OscypekListFiltersComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

function getDOMElements() {
  const typeLabel: HTMLElement = fixture.debugElement.query(
    By.css('mat-label[data-test-id="org-oscypek-list-filters-type-label"]')
  )?.nativeElement;
  const typeSelect: HTMLElement = fixture.debugElement.query(
    By.css('mat-select[data-test-id="org-oscypek-list-filters-type-select"]')
  )?.nativeElement;

  const sizeLabel: HTMLElement = fixture.debugElement.query(
    By.css('mat-label[data-test-id="org-oscypek-list-filters-size-label"]')
  )?.nativeElement;
  const sizeSelect: HTMLElement = fixture.debugElement.query(
    By.css('mat-select[data-test-id="org-oscypek-list-filters-size-select"]')
  )?.nativeElement;

  return {
    typeLabel,
    typeSelect,
    sizeLabel,
    sizeSelect,
  };
}
