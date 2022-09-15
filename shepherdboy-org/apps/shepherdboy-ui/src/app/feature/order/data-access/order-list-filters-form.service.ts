import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  Filter,
  OscypekSize,
  OscypekType,
} from '@shepherdboy-org/api-interfaces';
import {
  OrderListFilter,
  OrderListFiltersForm,
} from '../model/order-list-filters.model';

@Injectable()
export class OrderListFiltersFormService {
  constructor(private formBuilder: FormBuilder) {}

  public createEmptyForm(): FormGroup<OrderListFiltersForm> {
    return this.formBuilder.group({
      city: new FormControl<string | null>(null),
      size: new FormControl<OscypekSize | null>(null),
      type: new FormControl<OscypekType | null>(null),
    });
  }

  public fillForm(form: FormGroup, filters?: Filter[]): void {
    if (!filters) return;
    form.patchValue({
      city: filters.find((e) => e.name === OrderListFilter.CITY)?.value,
      size: filters.find((e) => e.name === OrderListFilter.SIZE)?.value,
      type: filters.find((e) => e.name === OrderListFilter.TYPE)?.value,
    });
  }
}
