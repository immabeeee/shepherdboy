import { TestBed } from '@angular/core/testing';
import { OrderItem, ShippingDetails } from '@shepherdboy-org/api-interfaces';
import { OrderTranslateService } from './order-translate.service';
import * as testData from '@shepherdboy-org/test-utils';

describe('OrderTranslateService', () => {
  let service: OrderTranslateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [OrderTranslateService],
    }).compileComponents();
  });
  beforeEach(() => {
    service = TestBed.inject(OrderTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should translate order', () => {
    //  given
    const shippingDetails1: ShippingDetails | null = testData.shippingDetails;
    const items1: OrderItem[] | null = [testData.orderItem];

    const shippingDetails2 = null;
    const items2 = null;

    // when
    const result1 = service.translateToCreateOrderRequest(
      shippingDetails1,
      items1
    );
    const result2 = service.translateToCreateOrderRequest(
      shippingDetails2,
      items2
    );
    const result3 = service.translateToCreateOrderRequest(
      shippingDetails1,
      items2
    );

    // then
    expect(result1).toEqual({
      shippingDetails: shippingDetails1,
      items: items1,
    });
    expect(result2).toEqual(undefined);
    expect(result3).toEqual(undefined);
  });
});
