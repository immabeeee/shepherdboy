import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { isDefined, OrderItem } from '@shepherdboy-org/api-interfaces';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  Subscription,
} from 'rxjs';
import { OfferService } from '../../data-access/offer.service';
import { OrderItemFormService } from '../../data-access/order-item-form.service';
import { AdditiveDialogComponent } from '../../feature/additive-dialog/additive-dialog.component';
import {
  AdditiveItemForm,
  OrderItemForm,
} from '../../model/order-item-form.model';

@Component({
  selector: 'shepherdboy-org-offer-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() orderItem?: OrderItem;
  @Input() isSecondary = false;

  public readonly formGroup: FormGroup<OrderItemForm>;
  private readonly subscriptions = new Subscription();

  get additives(): FormArray<FormGroup<AdditiveItemForm>> {
    return this.formGroup.controls.additives;
  }

  constructor(
    private readonly offerService: OfferService,
    private readonly orderItemFormService: OrderItemFormService,
    public dialog: MatDialog
  ) {
    this.formGroup = this.orderItemFormService.createEmptyForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['orderItem'] && changes['orderItem'].firstChange) {
      this.fillForm(changes['orderItem'].currentValue);
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.formGroup.controls.quantity.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((quantity) => this.handleOrderItemQuantityChanged(quantity))
    );

    this.subscriptions.add(
      merge(
        ...this.formGroup.controls.additives.controls.map(
          (formGroup: FormGroup<AdditiveItemForm>, index: number) =>
            formGroup.valueChanges.pipe(
              debounceTime(500),
              distinctUntilChanged((a, b) => a.quantity === b.quantity),
              map((field) => ({
                rowIndex: index,
                field,
              }))
            )
        )
      ).subscribe(
        (changes: {
          rowIndex: number;
          field: Partial<{
            id: string | null;
            quantity: string | null;
          }>;
        }) => {
          this.handleOrderItemAdditiveQuantityChanged(
            changes?.field?.quantity,
            changes.rowIndex
          );
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  removeOrderItem(id?: string): void {
    if (!id) return;
    this.offerService.removeOrderItem(id);
  }

  removeOrderItemAdditive(orderItemId?: string, additiveId?: string) {
    if (!orderItemId || !additiveId) return;
    this.offerService.removeOrderItemAdditive(orderItemId, additiveId);
  }

  public openAddAdditiveDialog() {
    const dialogRef = this.dialog.open(AdditiveDialogComponent, {
      panelClass: 'org-dialog-container',
      data: { oscypek: this.orderItem?.oscypek },
    });

    dialogRef.afterClosed().subscribe((orderItem: OrderItem) => {
      if (!orderItem) {
        return;
      }
      this.offerService.addOrderItem(orderItem);
    });
  }

  private fillForm(orderItem?: OrderItem): void {
    if (!orderItem) return;
    this.orderItemFormService.fillForm(this.formGroup, orderItem);
  }

  private handleOrderItemQuantityChanged(qty: string | null): void {
    const { id } = this.orderItem?.oscypek || { id: null };

    if (!isDefined(qty) || !id) return;

    this.offerService.updateOrderItemQuantity(id, Number(qty));
  }

  private handleOrderItemAdditiveQuantityChanged(
    qty: string | null | undefined,
    rowIndex: number
  ): void {
    const { id } = this.orderItem?.oscypek || { id: null };
    const { id: additiveId } = this.orderItem?.additives[rowIndex] || {
      id: null,
    };
    if (!isDefined(qty) || !id || !additiveId) return;

    this.offerService.updateOrderItemAdditiveQuantity(
      id,
      additiveId,
      Number(qty)
    );
  }
}
