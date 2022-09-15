import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { OrderItemAdditiveDetailsDTO } from './order-item-additive-details-dto.model';
import { OrderItemDetailsDTO } from './order-item-details-dto.model';
import { Type } from 'class-transformer';

export class OrderItemDTO {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OrderItemDetailsDTO)
  oscypek: OrderItemDetailsDTO;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemAdditiveDetailsDTO)
  additives: OrderItemAdditiveDetailsDTO[];
}
