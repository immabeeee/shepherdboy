import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  Filter,
  OscypekSize,
  OscypekType,
} from '@shepherdboy-org/api-interfaces';
import {
  OscypekListFilter,
  OscypekListFiltersForm,
} from '../model/oscypek-list-filters.model';

@Injectable()
export class OscypekListFiltersFormService {
  constructor(private formBuilder: FormBuilder) {}

  public createEmptyForm(): FormGroup<OscypekListFiltersForm> {
    return this.formBuilder.group({
      size: new FormControl<OscypekSize | null>(null),
      type: new FormControl<OscypekType | null>(null),
    });
  }

  public fillForm(form: FormGroup, filters?: Filter[]): void {
    form.patchValue({
      size: filters
        ? filters.find((e) => e.name === OscypekListFilter.SIZE)?.value
        : null,
      type: filters
        ? filters.find((e) => e.name === OscypekListFilter.TYPE)?.value
        : null,
    });
  }
}
