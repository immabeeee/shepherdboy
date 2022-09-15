import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import * as testData from '@shepherdboy-org/test-utils';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { OrderItemComponent } from './order-item.component';
import { OrderItemModule } from './order-item.module';
import { OfferService } from '../../data-access/offer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

let fixture: ComponentFixture<OrderItemComponent>;
let component: OrderItemComponent;
const offerServiceMock = {
  removeOrderItem: jest.fn(),
  removeOrderItemAdditive: jest.fn(),
  addOrderItem: jest.fn(),
  updateOrderItemQuantity: jest.fn(),
  updateOrderItemAdditiveQuantity: jest.fn(),
};

describe('OrderItemComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemComponent],
      imports: [
        OrderItemModule,
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        BrowserAnimationsModule,
      ],
      providers: [{ provide: OfferService, useValue: offerServiceMock }],
    })
      .overrideComponent(OrderItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not display an order item', () => {
    // given
    component.orderItem = undefined;
    component.isSecondary = false;
    component.ngOnChanges({
      orderItem: new SimpleChange(null, testData.orderItem, true),
    });
    fixture.detectChanges();

    // when
    const {
      oscypekTitle,
      oscypekQuantityInputLabel,
      oscypekQuantityInput,
      oscypekAddAdditiveButton,
      oscypekDeleteButton,
      additiveListEmpty,
      additiveList,
      additiveTitle,
      additiveQuantityInputLabel,
      additiveQuantityInput,
      additiveRemoveButton,
    } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(oscypekTitle).not.toBeDefined();
    expect(oscypekQuantityInputLabel).not.toBeDefined();
    expect(oscypekQuantityInput).not.toBeDefined();
    expect(oscypekAddAdditiveButton).not.toBeDefined();
    expect(oscypekDeleteButton).not.toBeDefined();
    expect(additiveListEmpty).not.toBeDefined();
    expect(additiveList).not.toBeDefined();
    expect(additiveTitle).not.toBeDefined();
    expect(additiveQuantityInputLabel).not.toBeDefined();
    expect(additiveQuantityInput).not.toBeDefined();
    expect(additiveRemoveButton).not.toBeDefined();
  });

  it('should display an order item with add-ons', () => {
    // given
    component.orderItem = testData.orderItem;
    component.isSecondary = false;
    component.ngOnChanges({
      orderItem: new SimpleChange(null, testData.orderItem, true),
    });
    fixture.detectChanges();

    // when
    const {
      oscypekTitle,
      oscypekQuantityInputLabel,
      oscypekQuantityInput,
      oscypekAddAdditiveButton,
      oscypekDeleteButton,
      additiveListEmpty,
      additiveList,
      additiveTitle,
      additiveQuantityInputLabel,
      additiveQuantityInput,
      additiveRemoveButton,
    } = getDOMElements();

    // then
    expect(component).toBeTruthy();
    expect(oscypekTitle).toBeDefined();
    expect(oscypekTitle.textContent).toContain(
      `Test oscypek (nonsmoked, large)`
    );
    expect(oscypekQuantityInputLabel).toBeDefined();
    expect(oscypekQuantityInputLabel.innerHTML).toContain('Quantity');
    expect(oscypekQuantityInput).toBeDefined();
    expect(oscypekQuantityInput.placeholder).toContain('Quantity');
    expect(oscypekAddAdditiveButton).toBeDefined();
    expect(oscypekAddAdditiveButton.textContent).toContain('add');
    expect(oscypekDeleteButton).toBeDefined();
    expect(oscypekDeleteButton.textContent).toContain('delete');
    expect(additiveListEmpty).not.toBeDefined();
    expect(additiveList).toBeDefined();
    expect(additiveTitle).toBeDefined();
    expect(additiveTitle.textContent).toContain(`Test additive`);
    expect(additiveQuantityInputLabel).toBeDefined();
    expect(additiveQuantityInputLabel.innerHTML).toContain('Quantity');
    expect(additiveQuantityInput).toBeDefined();
    expect(additiveQuantityInput.placeholder).toContain('Quantity');
    expect(additiveRemoveButton).toBeDefined();
    expect(additiveRemoveButton.textContent).toContain('delete');
  });

  it('should display an order item without add-ons', () => {
    // given
    const orderItem = { ...testData.orderItem, additives: [] };
    component.orderItem = orderItem;
    component.isSecondary = false;
    component.ngOnChanges({
      orderItem: new SimpleChange(null, orderItem, true),
    });
    fixture.detectChanges();

    // when
    const {
      oscypekTitle,
      oscypekQuantityInputLabel,
      oscypekQuantityInput,
      oscypekAddAdditiveButton,
      oscypekDeleteButton,
      additiveListEmpty,
      additiveList,
      additiveTitle,
      additiveQuantityInputLabel,
      additiveQuantityInput,
      additiveRemoveButton,
    } = getDOMElements();

    const additiveListEmptyParagraph: HTMLParagraphElement =
      fixture.debugElement.query(
        By.css(
          'shepherdboy-org-ui-message[data-test-id="org-order-item-additive-list-empty"] * p'
        )
      )?.nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(oscypekTitle).toBeDefined();
    expect(oscypekTitle.textContent).toContain(
      `Test oscypek (nonsmoked, large)`
    );
    expect(oscypekQuantityInputLabel).toBeDefined();
    expect(oscypekQuantityInputLabel.innerHTML).toContain('Quantity');
    expect(oscypekQuantityInput).toBeDefined();
    expect(oscypekQuantityInput.placeholder).toContain('Quantity');
    expect(oscypekAddAdditiveButton).toBeDefined();
    expect(oscypekAddAdditiveButton.textContent).toContain('add');
    expect(oscypekDeleteButton).toBeDefined();
    expect(oscypekDeleteButton.textContent).toContain('delete');
    expect(additiveListEmpty).toBeDefined();
    expect(additiveListEmptyParagraph.textContent).toContain('You have no add-ons added to your oscypek');
    expect(additiveList).not.toBeDefined();
    expect(additiveTitle).not.toBeDefined();
    expect(additiveQuantityInputLabel).not.toBeDefined();
    expect(additiveQuantityInput).not.toBeDefined();
    expect(additiveRemoveButton).not.toBeDefined();
  });
});

function getDOMElements() {
  const oscypekTitle: HTMLHeadingElement = fixture.debugElement.query(
    By.css('h2[data-test-id="org-order-item-oscypek-title"]')
  )?.nativeElement;
  const oscypekQuantityInputLabel: HTMLElement = fixture.debugElement.query(
    By.css('mat-label[data-test-id="org-order-item-oscypek-quantity-label"]')
  )?.nativeElement;
  const oscypekQuantityInput: HTMLInputElement = fixture.debugElement.query(
    By.css('input[data-test-id="org-order-item-oscypek-quantity-input"]')
  )?.nativeElement;
  const oscypekAddAdditiveButton: HTMLButtonElement =
    fixture.debugElement.query(
      By.css(
        'button[data-test-id="org-order-item-oscypek-add-additive-button"]'
      )
    )?.nativeElement;
  const oscypekDeleteButton: HTMLButtonElement = fixture.debugElement.query(
    By.css(
      'button[data-test-id="org-order-item-oscypek-delete-oscypek-button"]'
    )
  )?.nativeElement;
  const additiveListEmpty: HTMLElement = fixture.debugElement.query(
    By.css(
      'shepherdboy-org-ui-message[data-test-id="org-order-item-additive-list-empty"]'
    )
  )?.nativeElement;
  const additiveList: HTMLElement = fixture.debugElement.query(
    By.css('div[data-test-id="org-order-item-additive-list"]')
  )?.nativeElement;
  const additiveTitle: HTMLHeadingElement = fixture.debugElement.query(
    By.css('h2[data-test-id="org-order-item-additive-title"]')
  )?.nativeElement;
  const additiveQuantityInputLabel: HTMLElement = fixture.debugElement.query(
    By.css('mat-label[data-test-id="org-order-item-additive-quantity-label"]')
  )?.nativeElement;
  const additiveQuantityInput: HTMLInputElement = fixture.debugElement.query(
    By.css('input[data-test-id="org-order-item-additive-quantity-input"]')
  )?.nativeElement;
  const additiveRemoveButton: HTMLButtonElement = fixture.debugElement.query(
    By.css('button[data-test-id="org-order-item-additive-delete-button"]')
  )?.nativeElement;

  return {
    oscypekTitle,
    oscypekQuantityInputLabel,
    oscypekQuantityInput,
    oscypekAddAdditiveButton,
    oscypekDeleteButton,
    additiveListEmpty,
    additiveList,
    additiveTitle,
    additiveQuantityInputLabel,
    additiveQuantityInput,
    additiveRemoveButton,
  };
}
