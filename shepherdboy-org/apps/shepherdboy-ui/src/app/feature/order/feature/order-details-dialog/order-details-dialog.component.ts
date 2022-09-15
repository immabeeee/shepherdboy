import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderItem, OrderItemDetails } from '@shepherdboy-org/api-interfaces';
import { OrderFactored } from '../../model/order-factored.model';

export interface DialogData {
  order: OrderFactored;
}

@Component({
  selector: 'shepherdboy-org-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsDialogComponent {
  public orderItems: OrderItem[];

  constructor(
    private dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.orderItems = this.translateOrderItems(data.order.items);
  }

  private translateOrderItems(items: OrderItemDetails[]): OrderItem[] {
    return items.map((e) => {
      return {
        oscypek: {
          quantity: e.quantity,
          orderId: e.orderId,
          size: e.size,
          type: e.type,
          id: e.id,
          name: e.name,
          price: e.price,
          group: e.group,
        },
        additives: e.orderItemAdditives,
      };
    });
  }
}
