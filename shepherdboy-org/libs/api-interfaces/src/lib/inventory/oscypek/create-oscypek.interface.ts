import { InventoryItem } from './../inventory-item.interface';
import { OscypekSize, OscypekType } from './oscypek.inferface';

export interface CreateOscypekRequest extends InventoryItem {
  size: OscypekSize;
  type: OscypekType;
}

export interface CreateOscypekResponse extends InventoryItem {
  size: OscypekSize;
  type: OscypekType;
}
