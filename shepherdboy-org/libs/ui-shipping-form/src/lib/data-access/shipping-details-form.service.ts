import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ShippingDetailsForm,
  ShippingDetailsFormValue,
} from '../model/shipping-details-form.model';
import { validateZipCode } from '@shepherdboy-org/utils';

@Injectable()
export class ShippingDetailsFormService {
  constructor(private formBuilder: FormBuilder) {}

  public createEmptyForm(): FormGroup<ShippingDetailsForm> {
    return this.formBuilder.group({
      firstName: new FormControl<string | null>(null, [Validators.required]),
      lastName: new FormControl<string | null>(null, [Validators.required]),
      city: new FormControl<string | null>(null, [Validators.required]),
      zipCode: new FormControl<string | null>(null, [
        Validators.required,
        validateZipCode,
      ]),
      street: new FormControl<string | null>(null, [Validators.required]),
      houseNumber: new FormControl<string | null>(null, [Validators.required]),
      apartmentNumber: new FormControl<string | null>(null),
    });
  }

  public fillForm(
    form: FormGroup<ShippingDetailsForm>,
    details: ShippingDetailsFormValue
  ): void {
    form.patchValue(details);
  }
}
