import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import {
  CreateOscypekResponse,
  FindOscypekListResponse,
  UpdateOscypekResponse,
} from '@shepherdboy-org/api-interfaces';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { CreateOscypekDTO } from '../model/dto/oscypek/create-oscypek.dto.model';
import { FindOscypekListDTO } from '../model/dto/oscypek/find-oscypek-list-dto.model';
import { UpdateOscypekDTO } from '../model/dto/oscypek/update-oscypek.dto.model';
import { OscypekInventoryService } from '../service/oscypek-inventory.service';

@Controller('inventory/oscypek')
export class InventoryOscypekController {
  private readonly apiName = '[INVENTORY/OSCYPEK API]';

  constructor(
    private readonly oscypekInventoryService: OscypekInventoryService
  ) {}

  @Post('')
  createItem(
    @Body() body: CreateOscypekDTO
  ): Observable<CreateOscypekResponse> {
    return this.oscypekInventoryService.createItem(body);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string): Observable<DeleteResult> {
    return this.oscypekInventoryService.deleteItem(id);
  }

  @Post('list')
  find(@Body() body: FindOscypekListDTO): Observable<FindOscypekListResponse> {
    return this.oscypekInventoryService.findList(body);
  }

  @Put(':id')
  updateItem(
    @Param('id') id: string,
    @Body() body: UpdateOscypekDTO
  ): Observable<UpdateOscypekResponse> {
    return this.oscypekInventoryService.updateItem(id, body);
  }
}
