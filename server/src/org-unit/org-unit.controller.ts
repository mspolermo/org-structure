import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrgUnitService } from './org-unit.service';
import { CreateOrgUnitDto } from './dto/create-orgUnit.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrgUnit } from './org-unit.model';

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
}
