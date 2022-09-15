import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from '../inventory/inventory.module';
import { OrderController } from './controller/order.controller';
import { ShippingDetailsEntity } from './model/shipping-details.entity';
import { OrderItemAdditiveEntity } from './model/order-item-additive.entity';
import { OrderItemEntity } from './model/order-item.entity';
import { OrderEntity } from './model/order.entity';
import { OrderService } from './service/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      OrderItemAdditiveEntity,
      ShippingDetailsEntity,
    ]),
    InventoryModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
