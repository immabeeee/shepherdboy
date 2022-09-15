import { FormControl } from '@angular/forms';
import { OscypekSize, OscypekType } from '@shepherdboy-org/api-interfaces';

export interface OscypekListFiltersForm {
  size: FormControl<OscypekSize | null>;
  type: FormControl<OscypekType | null>;
}

export enum OscypekListFilter {
  SIZE = 'size',
  TYPE = 'type',
}
