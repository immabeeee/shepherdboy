import { FormControl } from '@angular/forms';
import { OscypekSize, OscypekType } from '@shepherdboy-org/api-interfaces';

export interface OrderListFiltersForm {
  city: FormControl<string | null>;
  size: FormControl<OscypekSize | null>;
  type: FormControl<OscypekType | null>;
}

export enum OrderListFilter {
  CITY = 'city',
  SIZE = 'size',
  TYPE = 'type',
}
