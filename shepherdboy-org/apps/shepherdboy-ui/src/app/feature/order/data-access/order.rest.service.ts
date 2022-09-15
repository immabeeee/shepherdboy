import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FindOrderListRequest,
  FindOrderListResponse,
  ListQuery,
} from '@shepherdboy-org/api-interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class OrderRestService {
  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private readonly httpClient: HttpClient) {}

  public fetchOrderList(
    listQuery: ListQuery
  ): Observable<FindOrderListResponse> {
    const path = `/order/list`;
    const req: FindOrderListRequest = {
      pageNumber: listQuery.page.pageNumber,
      pageSize: listQuery.page.pageSize,
      filters: listQuery.filters,
      sort: listQuery.sort,
    };
    return this.httpClient.post<FindOrderListResponse>(
      `${environment.baseApiUrl}${path}`,
      req,
      this.httpOptions
    );
  }
}
