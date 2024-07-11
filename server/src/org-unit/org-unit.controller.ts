import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrgUnitService } from './org-unit.service';
import { CreateOrgUnitDto } from './dto/create-orgUnit.dto';

@Controller('org-unit')
export class OrgUnitController {
    constructor(private orgUnitService: OrgUnitService) {}

    @Post()
    create(@Body() orgUnitDto: CreateOrgUnitDto) {
        return this.orgUnitService.createOrgUnit(orgUnitDto);
    }

    @Get()
    getAll() {
        return this.orgUnitService.getAllOrgUnits();
    }
}
