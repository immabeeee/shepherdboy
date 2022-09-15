import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('shippingdetails')
export class ShippingDetailsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: false })
  firstName: string;
  @Column({ unique: false })
  lastName: string;
  @Column({ unique: false })
  city: string;
  @Column({ unique: false })
  zipCode: string;
  @Column({ unique: false })
  street: string;
  @Column({ unique: false })
  houseNumber: string;
  @Column({ unique: false, nullable: true })
  apartmentNumber?: string;

  @Column()
  orderId: string;

  @OneToOne(() => OrderEntity, (orderEntity) => orderEntity.shippingDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: OrderEntity;
}
