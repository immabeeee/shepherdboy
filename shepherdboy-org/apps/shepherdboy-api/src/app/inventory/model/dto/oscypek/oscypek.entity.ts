import {
  OscypekType,
  OscypekSize,
  InventoryItemGroup,
} from '@shepherdboy-org/api-interfaces';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('oscypek')
export class OscypekEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ unique: false })
  name: string;

  @Column({ type: 'enum', enum: OscypekSize, default: OscypekSize.SMALL })
  size: OscypekSize;

  @Column({ type: 'enum', enum: OscypekType, default: OscypekType.SMOKED })
  type: OscypekType;

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
