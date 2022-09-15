import { FormControl } from '@angular/forms';

export interface ShippingDetailsForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  city: FormControl<string | null>;
  zipCode: FormControl<string | null>;
  street: FormControl<string | null>;
  houseNumber: FormControl<string | null>;
  apartmentNumber: FormControl<string | null>;
}

export interface ShippingDetailsFormValue {
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  zipCode: string | null;
  street: string | null;
  houseNumber: string | null;
  apartmentNumber?: string | null;
}
