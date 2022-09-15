import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  FindAdditiveListRequest,
  FindAdditiveListResponse,
  FindOscypekListRequest,
  FindOscypekListResponse,
  ListQuery,
  OrderItem,
  ShippingDetails,
} from '@shepherdboy-org/api-interfaces';
import { environment } from '../../../../environments/environment';
import { OrderTranslateService } from './order-translate.service';

@Injectable()
export class OfferRestService {
  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private readonly httpClient: HttpClient,
    private readonly orderTranslateService: OrderTranslateService
  ) {}

  public fetchOscypekList(
    listQuery: ListQuery
  ): Observable<FindOscypekListResponse> {
    const path = `/inventory/oscypek/list`;
    const req: FindOscypekListRequest = {
      pageNumber: listQuery.page.pageNumber,
      pageSize: listQuery.page.pageSize,
      filters: listQuery.filters,
      sort: listQuery.sort,
    };
    return this.httpClient.post<FindOscypekListResponse>(
      `${environment.baseApiUrl}${path}`,
      req,
      this.httpOptions
    );
  }

  public fetchAdditiveList(
    listQuery: ListQuery
  ): Observable<FindAdditiveListResponse> {
    const path = `/inventory/additive/list`;
    const req: FindAdditiveListRequest = {
      pageNumber: listQuery.page.pageNumber,
      pageSize: listQuery.page.pageSize,
      filters: listQuery.filters,
      sort: listQuery.sort,
    };
    return this.httpClient.post<FindAdditiveListResponse>(
      `${environment.baseApiUrl}${path}`,
      req,
      this.httpOptions
    );
  }

  public createOrder(
    shippingDetails: ShippingDetails | null,
    items: OrderItem[] | null
  ): Observable<CreateOrderResponse> {
    const path = `/order`;
    const req: CreateOrderRequest | undefined =
      this.orderTranslateService.translateToCreateOrderRequest(
        shippingDetails,
        items
      );
    return this.httpClient
      .post<CreateOrderResponse>(
        `${environment.baseApiUrl}${path}`,
        req,
        this.httpOptions
      )
      .pipe(delay(500));
  }
}
