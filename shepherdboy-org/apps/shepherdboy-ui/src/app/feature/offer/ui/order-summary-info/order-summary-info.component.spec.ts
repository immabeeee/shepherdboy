import { TestBed, ComponentFixture } from '@angular/core/testing';
import * as testData from '@shepherdboy-org/test-utils';
import { ChangeDetectionStrategy } from '@angular/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MockSelector, provideMockStore } from '@ngrx/store/testing';
import { getOrderView } from '../../data-access/state/offer.selectors';
import { OrderSummaryInfoComponent } from './order-summary-info.component';
import { OrderSummaryInfoModule } from './order-summary-info.module';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { RouterTestingModule } from '@angular/router/testing';

let fixture: ComponentFixture<OrderSummaryInfoComponent>;
let component: OrderSummaryInfoComponent;

describe('OrderSummaryInfoComponent', () => {
  it('should not display an order summary info when there is no added product', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getOrderView,
        value: {
          items: [],
          totalCost: 0,
        },
      },
    ]);

    fixture.detectChanges();

    // when
    const { container, cost, cartIcon, amount } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(container).not.toBeDefined();
    expect(cost).not.toBeDefined();
    expect(cartIcon).not.toBeDefined();
    expect(amount).not.toBeDefined();
  });

  it('should display an order summary info when there is at least one added product', () => {
    // given
    configureTestingModuleWithProvidedSelector([
      {
        selector: getOrderView,
        value: {
          items: [testData.orderItem],
          totalCost: 233.22,
        },
      },
    ]);

    fixture.detectChanges();

    // when
    const { container, cost, cartIcon, amount } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(container).toBeDefined();
    expect(cost).toBeDefined();
    expect(cost.textContent).toContain('233.22');
    expect(cartIcon).toBeDefined();
    expect(amount).toBeDefined();
    expect(amount.textContent).toContain('1');
  });
});

function configureTestingModuleWithProvidedSelector(selectors: MockSelector[]) {
  TestBed.configureTestingModule({
    declarations: [OrderSummaryInfoComponent],
    imports: [
      OrderSummaryInfoModule,
      TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
      BrowserAnimationsModule,
      RouterTestingModule.withRoutes([]),
    ],
    providers: [
      OfferStateFacade,
      provideMockStore({
        selectors: selectors,
      }),
    ],
  })
    .overrideComponent(OrderSummaryInfoComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();

  fixture = TestBed.createComponent(OrderSummaryInfoComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
}

function getDOMElements() {
  const container: HTMLElement = fixture.debugElement.query(
    By.css('div[data-test-id="org-order-summary-info"]')
  )?.nativeElement;

  const cost: HTMLHeadingElement = fixture.debugElement.query(
    By.css('h1[data-test-id="org-order-summary-info-cost"]')
  )?.nativeElement;

  const cartIcon: HTMLElement = fixture.debugElement.query(
    By.css(
      'shepherdboy-org-ui-icon-button[data-test-id="org-order-summary-info-cart-button"]'
    )
  )?.nativeElement;

  const amount: HTMLElement = fixture.debugElement.query(
    By.css(
      'span[data-test-id="org-order-summary-info-amount"]'
    )
  )?.nativeElement;

  return {
    container,
    cost,
    cartIcon,
    amount,
  };
}
