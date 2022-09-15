import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ShippingDetailsFormService } from '../../data-access/shipping-details-form.service';
import {
  ShippingDetailsForm,
  ShippingDetailsFormValue,
} from '../../model/shipping-details-form.model';

@Component({
  selector: 'shepherdboy-org-shipping-details-form',
  templateUrl: './shipping-details-form.component.html',
  styleUrls: ['./shipping-details-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingDetailsFormComponent implements OnChanges {
  @Output() submitResult: EventEmitter<ShippingDetailsFormValue> =
    new EventEmitter<ShippingDetailsFormValue>();
  @Input() shippingDetails?: ShippingDetailsFormValue | null;
  @Input() isViewMode = false;

  public readonly zipCodeMask = [/\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public readonly formGroup: FormGroup<ShippingDetailsForm>;

  get isInvalid(): boolean {
    return this.formGroup.invalid;
  }

  get isDisabled(): boolean {
    return this.formGroup.disabled;
  }

  get f() {
    return this.formGroup.controls;
  }

  constructor(private shippingDetailsFormService: ShippingDetailsFormService) {
    this.formGroup = this.shippingDetailsFormService.createEmptyForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shippingDetails'].currentValue) {
      this.shippingDetailsFormService.fillForm(
        this.formGroup,
        changes['shippingDetails'].currentValue
      );
      this.formGroup.disable();
    }
  }

  public submit(): void {
    if (this.isViewMode) {
      return;
    }
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;
    this.submitResult.emit(this.formGroup.getRawValue());
  }

  public enableForm(): void {
    if (this.isViewMode) {
      return;
    }
    this.formGroup.enable();
  }
}
