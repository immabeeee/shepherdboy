import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Filter,
  generateDefaultListQuery,
  ListQuery,
  OscypekSize,
  OscypekType,
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
import { OscypekListFiltersFormService } from '../../data-access/ocsypek-list-filters-form.service';
import { OfferService } from '../../data-access/offer.service';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { OscypekListView } from '../../data-access/state/offer.models';
import {
  OscypekListFilter,
  OscypekListFiltersForm,
} from '../../model/oscypek-list-filters.model';

@Component({
  selector: 'shepherdboy-org-offer-oscypek-list-filters',
  templateUrl: './oscypek-list-filters.component.html',
  styleUrls: ['./oscypek-list-filters.component.scss'],
})
export class OscypekListFiltersComponent {
  public filters$!: Observable<Filter[]>;
  public listQuery$: Observable<ListQuery | null> =
    this.offerStateFacade.osycpekListView$.pipe(
      tap((vm: OscypekListView) =>
        this.oscypekListFiltersFormService.fillForm(
          this.formGroup,
          vm?.listQuery?.filters
        )
      ),
      map((vm: OscypekListView) => vm.listQuery)
    );

  public formGroup: FormGroup<OscypekListFiltersForm>;

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
    private offerService: OfferService,
    private offerStateFacade: OfferStateFacade,
    private oscypekListFiltersFormService: OscypekListFiltersFormService
  ) {
    this.formGroup = this.oscypekListFiltersFormService.createEmptyForm();
    this.offerService.fetchOscypekList();
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
          this.offerService.fetchOscypekList(
            newListQuery.updateFilters(filters)
          );
        })
      )
      .subscribe();
  }

  private subscribeFilters(): Observable<Filter[]> {
    return combineLatest([
      this.formGroup.controls.size.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ),
      this.formGroup.controls.type.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ),
    ]).pipe(
      map(([size, type]: [OscypekSize | null, OscypekType | null]) =>
        this.mapToFilterList(size, type)
      ),
      tap((filters: Filter[]) => this.fetchTeams(filters))
    );
  }

  private mapToFilterList(
    size: OscypekSize | null,
    type: OscypekType | null
  ): Filter[] {
    return [
      new Filter(OscypekListFilter.SIZE, size),
      new Filter(OscypekListFilter.TYPE, type),
    ].filter((e) => e.value);
  }
}
