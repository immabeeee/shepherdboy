import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OrderItem } from '@shepherdboy-org/api-interfaces';
import { OrderItemFormService } from './order-item-form.service';
import * as testData from '@shepherdboy-org/test-utils';

describe('OrderItemFormService', () => {
  let service: OrderItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule],
      providers: [OrderItemFormService, FormBuilder],
    }).compileComponents();
  });
  beforeEach(() => {
    service = TestBed.inject(OrderItemFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an empty form', () => {
    // given

    // when
    const form = service.createEmptyForm();

    // then
    expect(form).toBeTruthy();
    expect(form.invalid).toBe(false);
    expect(form.get('id')).toBeTruthy();
    expect(form.get('id')?.value).toBe(null);
    expect(form.get('id')?.disabled).toBe(false);
    expect(form.get('id')?.valid).toBe(true);
    expect(form.get('id')?.errors).toEqual(null);
    expect(form.get('quantity')).toBeTruthy();
    expect(form.get('quantity')?.value).toBe(null);
    expect(form.get('quantity')?.disabled).toBe(false);
    expect(form.get('quantity')?.valid).toBe(true);
    expect(form.get('quantity')?.errors).toEqual(null);
    expect(form.get('additives')).toBeTruthy();
    expect(form.get('additives')?.value).toEqual([]);
    expect(form.get('additives')?.disabled).toBe(false);
    expect(form.get('additives')?.valid).toBe(true);
    expect(form.get('additives')?.errors).toEqual(null);
  });

  it('should fill an empty form', () => {
    // given
    const form1 = service.createEmptyForm();
    const form2 = service.createEmptyForm();
    const orderItem1: OrderItem = testData.orderItem;
    const orderItem2: OrderItem = { ...testData.orderItem, additives: [] };
    // when

    service.fillForm(form1, orderItem1);
    service.fillForm(form2, orderItem2);

    // then
    expect(form1).toBeTruthy();
    expect(form1.invalid).toBe(false);
    expect(form1.get('id')).toBeTruthy();
    expect(form1.get('id')?.value).toBe(orderItem1.oscypek.id);
    expect(form1.get('id')?.disabled).toBe(false);
    expect(form1.get('id')?.valid).toBe(true);
    expect(form1.get('id')?.errors).toEqual(null);
    expect(form1.get('quantity')).toBeTruthy();
    expect(form1.get('quantity')?.value).toBe(
      orderItem1.oscypek.quantity.toString()
    );
    expect(form1.get('quantity')?.disabled).toBe(false);
    expect(form1.get('quantity')?.valid).toBe(true);
    expect(form1.get('quantity')?.errors).toEqual(null);
    expect(form1.get('additives')).toBeTruthy();
    expect(form1.get('additives')?.value).toEqual([
      {
        id: orderItem1.additives[0].id,
        quantity: orderItem1.additives[0].quantity.toString(),
      },
    ]);
    expect(form1.get('additives')?.disabled).toBe(false);
    expect(form1.get('additives')?.valid).toBe(true);
    expect(form1.get('additives')?.errors).toEqual(null);

    expect(form2).toBeTruthy();
    expect(form2.invalid).toBe(false);
    expect(form2.get('id')).toBeTruthy();
    expect(form2.get('id')?.value).toBe(orderItem1.oscypek.id);
    expect(form2.get('id')?.disabled).toBe(false);
    expect(form2.get('id')?.valid).toBe(true);
    expect(form2.get('id')?.errors).toEqual(null);
    expect(form2.get('quantity')).toBeTruthy();
    expect(form2.get('quantity')?.value).toBe(
      orderItem1.oscypek.quantity.toString()
    );
    expect(form2.get('quantity')?.disabled).toBe(false);
    expect(form2.get('quantity')?.valid).toBe(true);
    expect(form2.get('quantity')?.errors).toEqual(null);
    expect(form2.get('additives')).toBeTruthy();
    expect(form2.get('additives')?.value).toEqual([]);
    expect(form2.get('additives')?.disabled).toBe(false);
    expect(form2.get('additives')?.valid).toBe(true);
    expect(form2.get('additives')?.errors).toEqual(null);
  });
});
