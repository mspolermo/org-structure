import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrgUnitService } from './org-unit.service';
import { CreateOrgUnitDto } from './dto/create-orgUnit.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrgUnit } from './org-unit.model';

@ApiTags('Оргюниты')
@Controller('org-unit')
export class OrgUnitController {
    constructor(private orgUnitService: OrgUnitService) {}

    @ApiOperation({ summary: 'Создание оргюнита' })
    @ApiResponse({ status: 200, type: OrgUnit })
    @Post()
    create(@Body() orgUnitDto: CreateOrgUnitDto) {
        return this.orgUnitService.createOrgUnit(orgUnitDto);
    }

    @ApiOperation({ summary: 'Получить все оргюниты' })
    @ApiResponse({ status: 200, type: [OrgUnit] })
    @Get()
    getAll() {
        return this.orgUnitService.getAllOrgUnits();
    }

    @ApiOperation({ summary: 'Получить оргюнит по id' })
    @ApiResponse({ status: 200, type: OrgUnit })
    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.orgUnitService.getOrgUnitById(id);
    }
}
