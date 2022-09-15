import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderItem } from '@shepherdboy-org/api-interfaces';

@Component({
  selector: 'shepherdboy-org-order-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemListComponent {
  @Input() public orderItems: OrderItem[];
  public readonly displayedColumns: string[] = [
    'position',
    'name',
    'price',
    'quantity',
    'type',
    'size',
  ];
  public readonly expandedRowDisplayedColumns: string[] = [
    'position',
    'name',
    'price',
    'quantity',
  ];
}
