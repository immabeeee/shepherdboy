export enum InventoryItemGroup {
  OSCYPEK = 'oscypek',
  ADDITIVE = 'additive',
}

export interface InventoryItem {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  availableAmount?: number;
  name: string;
  price: number;
  group: InventoryItemGroup;
}
