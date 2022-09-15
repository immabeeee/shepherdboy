import { AbstractControl, ValidationErrors } from '@angular/forms';

const ZIP_CODE_REGEX = new RegExp('^[0-9]{2}-[0-9]{3}$');

export function validateZipCode(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value == null) {
    return null;
  }

  if (!ZIP_CODE_REGEX.test(control.value)) {
    return { zipCodeInvalid: { valid: false } } as ValidationErrors;
  }

  return null;
}
