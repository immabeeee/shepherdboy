import { ORDER_STATUS } from '@shepherdboy-org/api-interfaces';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { ShippingDetailsEntity } from './shipping-details.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'enum', enum: ORDER_STATUS })
  status: ORDER_STATUS;

  @OneToOne(
    () => ShippingDetailsEntity,
    (shippingDetailsEntity) => shippingDetailsEntity.order
  )
  shippingDetails: ShippingDetailsEntity;

  @OneToMany(() => OrderItemEntity, (orderItemEntity) => orderItemEntity.order)
  items: OrderItemEntity[];
}
