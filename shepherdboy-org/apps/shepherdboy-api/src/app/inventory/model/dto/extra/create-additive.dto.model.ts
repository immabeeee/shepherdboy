import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsNumberString,
} from 'class-validator';
import {
  CreateAdditiveRequest,
  InventoryItemGroup,
} from '@shepherdboy-org/api-interfaces';

export class CreateAdditiveDTO implements CreateAdditiveRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(InventoryItemGroup)
  group: InventoryItemGroup;

  @IsNotEmpty()
  @IsNumber()
  availableAmount: number;

  @IsNotEmpty()
  @IsNumberString()
  price: number;
}
