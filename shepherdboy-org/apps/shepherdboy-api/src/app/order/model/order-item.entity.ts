import {
  InventoryItemGroup,
  OscypekSize,
  OscypekType,
} from '@shepherdboy-org/api-interfaces';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderItemAdditiveEntity } from './order-item-additive.entity';
import { OrderEntity } from './order.entity';

@Entity('order_item')
export class OrderItemEntity {
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
    enum: OscypekSize,
  })
  size: OscypekSize;

  @Column({
    type: 'enum',
    enum: OscypekType,
  })
  type: OscypekType;

  @Column({
    type: 'enum',
    enum: InventoryItemGroup,
  })
  group: InventoryItemGroup;

  @Column()
  orderId: string;

  @ManyToOne(() => OrderEntity, (orderEntity) => orderEntity.items, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  order: OrderEntity;

  @OneToMany(
    () => OrderItemAdditiveEntity,
    (orderItemAdditiveEntity) => orderItemAdditiveEntity.orderItem
  )
  orderItemAdditives: OrderItemAdditiveEntity[];
}
