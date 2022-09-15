import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Filter,
  generateDefaultListQuery,
  ListQuery,
  OscypekSize,
  OscypekType,
  Sort,
  SortDirection,
} from '@shepherdboy-org/api-interfaces';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  skipWhile,
  take,
  tap,
} from 'rxjs';
import { OrderListFiltersFormService } from '../../data-access/order-list-filters-form.service';
import { OrderService } from '../../data-access/order.service';
import { OrderStateFacade } from '../../data-access/state/order.facade';
import { OrderListView } from '../../data-access/state/order.models';
import {
  OrderListFilter,
  OrderListFiltersForm,
} from '../../model/order-list-filters.model';

@Component({
  selector: 'shepherdboy-org-order-order-list-filters',
  templateUrl: './order-list-filters.component.html',
  styleUrls: ['./order-list-filters.component.scss'],
})
export class OrderListFiltersComponent {
  public filters$!: Observable<Filter[]>;
  public listQuery$: Observable<ListQuery | null> =
    this.orderStateFacade.orderListView$.pipe(
      tap((vm: OrderListView) =>
        this.orderListFiltersFormService.fillForm(
          this.formGroup,
          vm?.listQuery?.filters
        )
      ),
      map((vm: OrderListView) => vm.listQuery)
    );

  public formGroup: FormGroup<OrderListFiltersForm>;

  public types: { value: string | null; viewValue: string }[] = [
    { value: null, viewValue: 'clear' },
    { value: OscypekType.NON_SMOKED, viewValue: OscypekType.NON_SMOKED },
    { value: OscypekType.SMOKED, viewValue: OscypekType.SMOKED },
  ];
  public sizes: { value: string | null; viewValue: string }[] = [
    { value: null, viewValue: 'clear' },
    { value: OscypekSize.LARGE, viewValue: OscypekSize.LARGE },
    { value: OscypekSize.MEDIUM, viewValue: OscypekSize.MEDIUM },
    { value: OscypekSize.SMALL, viewValue: OscypekSize.SMALL },
  ];

  constructor(
    private orderService: OrderService,
    private orderStateFacade: OrderStateFacade,
    private orderListFiltersFormService: OrderListFiltersFormService
  ) {
    this.formGroup = this.orderListFiltersFormService.createEmptyForm();
    this.orderService.fetchOrderList(
      generateDefaultListQuery().updateSort(
        new Sort('createdAt', SortDirection.DESC)
      )
    );
    this.filters$ = this.subscribeFilters();
  }

  public fetchTeams(filters: Filter[]) {
    this.listQuery$
      .pipe(
        take(1),
        filter(
          (listQuery) =>
            JSON.stringify(listQuery?.filters) !== JSON.stringify(filters)
        ),
        skipWhile(() => !filters),
        tap((listQuery: ListQuery | null) => {
          const newListQuery = listQuery
            ? listQuery
            : generateDefaultListQuery();
          this.orderService.fetchOrderList(newListQuery.updateFilters(filters));
        })
      )
      .subscribe();
  }

  private subscribeFilters(): Observable<Filter[]> {
    return combineLatest([
      this.formGroup.controls.city.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ),
      this.formGroup.controls.size.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ),
      this.formGroup.controls.type.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ),
    ]).pipe(
      map(
        ([city, size, type]: [
          string | null,
          OscypekSize | null,
          OscypekType | null
        ]) => this.mapToFilterList(city, size, type)
      ),
      tap((filters: Filter[]) => this.fetchTeams(filters))
    );
  }

  private mapToFilterList(
    city: string | null,
    size: OscypekSize | null,
    type: OscypekType | null
  ): Filter[] {
    return [
      new Filter(OrderListFilter.CITY, city),
      new Filter(OrderListFilter.SIZE, size),
      new Filter(OrderListFilter.TYPE, type),
    ].filter((e) => e.value);
  }
}
