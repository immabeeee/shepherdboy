import { InventoryItem } from '../inventory-item.interface';

export enum OscypekType {
  SMOKED = 'smoked',
  NON_SMOKED = 'nonsmoked',
}

export enum OscypekSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export interface Oscypek extends InventoryItem {
  size: OscypekSize;
  type: OscypekType;
}
