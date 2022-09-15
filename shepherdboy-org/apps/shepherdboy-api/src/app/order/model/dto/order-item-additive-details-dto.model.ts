import { InventoryItemGroup } from '@shepherdboy-org/api-interfaces';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class OrderItemAdditiveDetailsDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(InventoryItemGroup)
  group: InventoryItemGroup;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  price: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  availableAmount: number;
}
