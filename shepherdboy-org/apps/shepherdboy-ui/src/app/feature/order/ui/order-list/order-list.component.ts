import { Component, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { OrderService } from '../../data-access/order.service';
import { OrderStateFacade } from '../../data-access/state/order.facade';
import { OrderListView } from '../../data-access/state/order.models';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatSort,
  Sort as MaterialSort,
  SortDirection,
} from '@angular/material/sort';
import {
  generateDefaultListQuery,
  ListQuery,
  ORDER_STATUS,
  Sort,
  SortDirection as ApiSortDirection,
} from '@shepherdboy-org/api-interfaces';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from '../../feature/order-details-dialog/order-details-dialog.component';
import { OrderFactored } from '../../model/order-factored.model';

@Component({
  selector: 'shepherdboy-org-order-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public readonly ORDER_STATUS: typeof ORDER_STATUS = ORDER_STATUS;
  public listQuery: ListQuery | null;
  public orderListView$: Observable<OrderListView> =
    this.orderStateFacade.orderListView$.pipe(
      tap((e) => (this.listQuery = e.listQuery))
    );

  public readonly displayedColumns: string[] = [
    'position',
    'createdAt',
    'updatedAt',
    'itemsAmount',
    'itemsQuantity',
    'size',
    'type',
    'city',
    'status',
    'details',
  ];

  get sortDirection(): SortDirection {
    const orderBy: ApiSortDirection =
      this.listQuery?.sort?.orderBy || ApiSortDirection.DESC;
    return orderBy === ApiSortDirection.ASC
      ? ('asc' as SortDirection)
      : ('desc' as SortDirection);
  }

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private orderStateFacade: OrderStateFacade
  ) {}

  public handlePageChanged(pageEvent: PageEvent): void {
    const { pageSize, totalElements, totalPages } =
      this.listQuery?.page || generateDefaultListQuery().page;
    this.orderService.fetchOrderList(
      this.listQuery?.updatePage(
        pageEvent.pageIndex,
        pageSize,
        totalElements,
        totalPages
      )
    );
  }

  public handleSortChanged(sortEvent: MaterialSort): void {
    const orderBy =
      sortEvent.direction === 'asc'
        ? ApiSortDirection.ASC
        : ApiSortDirection.DESC;
    this.orderService.fetchOrderList(
      this.listQuery?.updateSort(new Sort(sortEvent.active, orderBy))
    );
  }

  public openOrderDetailsDialog(order: OrderFactored) {
    this.dialog.open(OrderDetailsDialogComponent, {
      panelClass: 'org-dialog-container',
      data: { order },
    });
  }
}
