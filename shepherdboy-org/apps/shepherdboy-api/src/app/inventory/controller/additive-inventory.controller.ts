import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateAdditiveResponse,
  FindAdditiveListResponse,
  FindAdditiveResponse,
  UpdateAdditiveResponse,
} from '@shepherdboy-org/api-interfaces';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { CreateAdditiveDTO } from '../model/dto/extra/create-additive.dto.model';
import { FindAdditiveListDTO } from '../model/dto/extra/find-additive-list.dto.model';
import { UpdateAdditiveDTO } from '../model/dto/extra/update-additive.dto.model';
import { AdditiveInventoryService } from '../service/additive-inventory.service';

@Controller('inventory/additive')
export class InventoryAdditiveController {
  private readonly apiName = '[INVENTORY/ADDITIVE API]';

  constructor(
    private readonly additiveInventoryService: AdditiveInventoryService
  ) {}

  @Post('')
  createItem(
    @Body() body: CreateAdditiveDTO
  ): Observable<CreateAdditiveResponse> {
    return this.additiveInventoryService.createItem(body);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string): Observable<DeleteResult> {
    return this.additiveInventoryService.deleteItem(id);
  }

  @Get(':id')
  findItem(@Param('id') id: string): Observable<FindAdditiveResponse> {
    return this.additiveInventoryService.findItem(id);
  }

  @Post('list')
  find(@Body() body: FindAdditiveListDTO): Observable<FindAdditiveListResponse> {
    return this.additiveInventoryService.findList(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateAdditiveDTO
  ): Observable<UpdateAdditiveResponse> {
    return this.additiveInventoryService.updateItem(id, body);
  }
}
