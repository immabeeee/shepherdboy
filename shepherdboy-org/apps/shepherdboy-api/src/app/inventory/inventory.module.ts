import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryAdditiveController } from './controller/additive-inventory.controller';
import { InventoryOscypekController } from './controller/oscypek-inventory.controller';
import { AdditiveEntity } from './model/dto/extra/additive.entity';
import { OscypekEntity } from './model/dto/oscypek/oscypek.entity';
import { AdditiveInventoryService } from './service/additive-inventory.service';
import { OscypekInventoryService } from './service/oscypek-inventory.service';

@Module({
  imports: [TypeOrmModule.forFeature([OscypekEntity, AdditiveEntity])],
  providers: [OscypekInventoryService, AdditiveInventoryService],
  controllers: [InventoryOscypekController, InventoryAdditiveController],
  exports: [OscypekInventoryService, AdditiveInventoryService],
})
export class InventoryModule {}
