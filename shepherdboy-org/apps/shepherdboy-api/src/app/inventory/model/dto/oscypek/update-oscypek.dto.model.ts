import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsArray,
} from 'class-validator';
import {
  InventoryItemGroup,
  OscypekSize,
  OscypekType,
  UpdateOscypekRequest,
} from '@shepherdboy-org/api-interfaces';

export class UpdateOscypekDTO implements UpdateOscypekRequest {
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
