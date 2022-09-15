import { InventoryItemGroup } from '@shepherdboy-org/api-interfaces';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity('order_item_additive')
export class OrderItemAdditiveEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: '0',
    unique: false,
  })
  price: number;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: InventoryItemGroup,
  })
  group: InventoryItemGroup;

  @Column()
  orderId: string;

  @Column()
  orderItemId: string;

  @ManyToOne(
    () => OrderItemEntity,
    (orderEntity) => orderEntity.orderItemAdditives,
    {
      onDelete: 'SET NULL',
    }
  )
  @JoinColumn()
  orderItem: OrderItemEntity;
}
