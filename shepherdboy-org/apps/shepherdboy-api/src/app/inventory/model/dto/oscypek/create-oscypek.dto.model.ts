import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import {
  CreateOscypekRequest,
  InventoryItemGroup,
  OscypekSize,
  OscypekType,
} from '@shepherdboy-org/api-interfaces';

export class CreateOscypekDTO implements CreateOscypekRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(OscypekSize)
  size: OscypekSize;

  @IsNotEmpty()
  @IsEnum(OscypekType)
  type: OscypekType;

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
