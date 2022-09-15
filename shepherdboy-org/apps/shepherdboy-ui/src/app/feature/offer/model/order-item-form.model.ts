import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface OrderItemForm {
  id: FormControl<string | null>;
  quantity: FormControl<string | null>;
  additives: FormArray<FormGroup<AdditiveItemForm>>;
}

export interface AdditiveItemForm {
  id: FormControl<string | null>;
  quantity: FormControl<string | null>;
}
