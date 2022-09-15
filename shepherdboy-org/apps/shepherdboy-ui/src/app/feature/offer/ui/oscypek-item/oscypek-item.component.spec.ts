import { TestBed, ComponentFixture } from '@angular/core/testing';
import * as testData from '@shepherdboy-org/test-utils';
import { ChangeDetectionStrategy } from '@angular/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MockSelector, provideMockStore } from '@ngrx/store/testing';
import { getAdditiveListView } from '../../data-access/state/offer.selectors';
import { OscypekItemComponent } from './oscypek-item.component';
import { OscypekItemModule } from './oscypek-item.module';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import { OfferService } from '../../data-access/offer.service';

let fixture: ComponentFixture<OscypekItemComponent>;
let component: OscypekItemComponent;
const offerServiceMock = {
  addOrderItem: jest.fn(),
};

describe('OscypekItemComponent', () => {
  it('should not display an oscypek item', () => {
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
    ]);

    component.oscypek = undefined;
    fixture.detectChanges();

    // when
    const {
      oscypekItem,
      oscypekItemName,
      oscypekItemAvailableAmount,
      oscypekItemType,
      oscypekItemSize,
      oscypekItemPrice,
    } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(oscypekItem).not.toBeDefined();
    expect(oscypekItemName).not.toBeDefined();
    expect(oscypekItemAvailableAmount).not.toBeDefined();
    expect(oscypekItemType).not.toBeDefined();
    expect(oscypekItemSize).not.toBeDefined();
    expect(oscypekItemPrice).not.toBeDefined();
  });
});

function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
  TestBed.configureTestingModule({
    declarations: [OscypekItemComponent],
    imports: [
      OscypekItemModule,
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
    .overrideComponent(OscypekItemComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();

  fixture = TestBed.createComponent(OscypekItemComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

function getDOMElements() {
  const oscypekItem: HTMLElement = fixture.debugElement.query(
    By.css(`div[data-test-id="org-oscypek-item-${testData.oscypek.id}"]`)
  )?.nativeElement;

  const oscypekItemName: HTMLHeadingElement = fixture.debugElement.query(
    By.css('h3[data-test-id="org-oscypek-item-name"]')
  )?.nativeElement;

  const oscypekItemAvailableAmount: HTMLParagraphElement =
    fixture.debugElement.query(
      By.css('p[data-test-id="org-oscypek-item-available-amount"]')
    )?.nativeElement;

  const oscypekItemType: HTMLElement = fixture.debugElement.query(
    By.css('mat-chip[data-test-id="org-oscypek-item-type"]')
  )?.nativeElement;

  const oscypekItemSize: HTMLElement = fixture.debugElement.query(
    By.css('mat-chip[data-test-id="org-oscypek-item-size"]')
  )?.nativeElement;

  const oscypekItemPrice: HTMLElement = fixture.debugElement.query(
    By.css('h2[data-test-id="org-oscypek-item-price"]')
  )?.nativeElement;

  return {
    oscypekItem,
    oscypekItemName,
    oscypekItemAvailableAmount,
    oscypekItemType,
    oscypekItemSize,
    oscypekItemPrice,
  };
}
