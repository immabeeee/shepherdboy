import {
  InventoryItemGroup,
} from '@shepherdboy-org/api-interfaces';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('additive')
export class AdditiveEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ unique: false })
  name: string;

  @Column({
    type: 'enum',
    enum: InventoryItemGroup,
  })
  group: InventoryItemGroup;

  @Column({ unique: false })
  availableAmount: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: '0',
    unique: false,
  })
  price: number;
}
