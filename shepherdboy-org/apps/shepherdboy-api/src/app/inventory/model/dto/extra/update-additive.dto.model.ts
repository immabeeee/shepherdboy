import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsNumberString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import {
  InventoryItemGroup,
  UpdateAdditiveRequest,
} from '@shepherdboy-org/api-interfaces';

export class UpdateAdditiveDTO implements UpdateAdditiveRequest {
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
