import { IsDefined, IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { OrderItemDTO } from './order-item-dto.model';
import { ShippingDetailsDTO } from './shipping-details-dto.model';
import { Type } from 'class-transformer';

export class CreateOrderDTO {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ShippingDetailsDTO)
  shippingDetails: ShippingDetailsDTO;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
