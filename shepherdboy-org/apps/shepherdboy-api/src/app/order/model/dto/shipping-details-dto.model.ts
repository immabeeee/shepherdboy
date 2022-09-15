import {
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class ShippingDetailsDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsPostalCode('PL')
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  houseNumber: string;

  @IsOptional()
  @IsString()
  apartmentNumber?: string;
}
