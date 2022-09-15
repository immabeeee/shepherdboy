import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { first } from 'rxjs';
import { OfferRestService } from './offer.rest.service';
import * as testData from '@shepherdboy-org/test-utils';
import {
  CreateOrderResponse,
  FindAdditiveListRequest,
  FindOscypekListResponse,
  generateDefaultListQuery,
} from '@shepherdboy-org/api-interfaces';
import { environment } from 'apps/shepherdboy-ui/src/environments/environment';
import { OrderTranslateService } from './order-translate.service';

describe('OfferRestService', () => {
  let service: OfferRestService;
  let httpMock: HttpTestingController;
  const orderTranslateServiceMock = {
    translateToCreateOrderRequest: jest.fn(),
  };

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OfferRestService,
        { provide: OrderTranslateService, useValue: orderTranslateServiceMock },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    service = TestBed.inject(OfferRestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable with CreateOrderResponse', () => {
    // given
    const shippingDetails = testData.shippingDetails;
    const items = [testData.orderItem];
    const expectedResult: CreateOrderResponse = {} as CreateOrderResponse;
    // when
    service
      .createOrder(shippingDetails, items)
      .pipe(first())
      .subscribe((resp: CreateOrderResponse) => {
        // then
        expect(resp).toBeTruthy();
        expect(resp).toEqual(expectedResult);
      });

    const req = httpMock.expectOne(`${environment.baseApiUrl}/order`);
    // then
    expect(req.request.method).toBe('POST');
    req.flush(expectedResult);
  });

  it('should return an observable with FindAdditiveListRequest', () => {
    // given
    const listQuery = generateDefaultListQuery();
    const expectedResult: FindAdditiveListRequest =
      {} as FindAdditiveListRequest;

    // when
    service
      .fetchAdditiveList(listQuery)
      .pipe(first())
      .subscribe((resp: FindAdditiveListRequest) => {
        // then
        expect(resp).toBeTruthy();
        expect(resp).toEqual(expectedResult);
      });

    const req = httpMock.expectOne(
      `${environment.baseApiUrl}/inventory/additive/list`
    );
    // then
    expect(req.request.method).toBe('POST');
    req.flush(expectedResult);
  });

  it('should return an observable with FindOscypekListResponse', () => {
    // given
    const listQuery = generateDefaultListQuery();
    const expectedResult: FindOscypekListResponse =
      {} as FindOscypekListResponse;

    // when
    service
      .fetchOscypekList(listQuery)
      .pipe(first())
      .subscribe((resp: FindOscypekListResponse) => {
        // then
        expect(resp).toBeTruthy();
        expect(resp).toEqual(expectedResult);
      });

    const req = httpMock.expectOne(
      `${environment.baseApiUrl}/inventory/oscypek/list`
    );
    // then
    expect(req.request.method).toBe('POST');
    req.flush(expectedResult);
  });
});
