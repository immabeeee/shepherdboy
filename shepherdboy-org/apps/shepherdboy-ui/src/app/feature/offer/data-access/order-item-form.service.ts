import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OrderItem } from '@shepherdboy-org/api-interfaces';
import { OrderItemForm } from '../model/order-item-form.model';

@Injectable()
export class OrderItemFormService {
  constructor(private formBuilder: FormBuilder) {}

  public createEmptyForm(): FormGroup<OrderItemForm> {
    return this.formBuilder.group({
      id: new FormControl<string | null>(null),
      quantity: new FormControl<string | null>(null),
      additives: new FormArray([] as any),
    });
  }

  public fillForm(form: FormGroup<OrderItemForm>, orderItem: OrderItem): void {
    if (!form || !orderItem) return;
    const { id, quantity } = orderItem.oscypek;
    const { additives } = orderItem;

    form.patchValue({
      quantity: quantity ? quantity.toString() : null,
      id: id ? id : null,
    });

    additives.map((additive) => {
      const additiveFormGroup = this.formBuilder.group({
        quantity: additive.quantity ? additive.quantity.toString() : null,
        id: additive.id ? additive.id : null,
      });

      form.controls.additives.push(additiveFormGroup);
    });
  }
}
