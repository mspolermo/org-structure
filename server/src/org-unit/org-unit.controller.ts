import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    Request,
    Delete,
} from '@nestjs/common';
import { OrgUnitService } from './org-unit.service';
import { CreateOrgUnitDto } from './dto/create-orgUnit.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrgUnit } from './org-unit.model';
import { UpdateOrgUnitDto } from './dto/update-orgUnit.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

    @ApiOperation({ summary: 'Получить навигацию' })
    @ApiResponse({ status: 200 })
    // TODO: типизировать req
    @UseGuards(JwtAuthGuard)
    @Get('getNav')
    getNav(@Request() req) {
        const user = req.user;
        return this.orgUnitService.getOrgUnitsNavigation(user);
    }

    @ApiOperation({ summary: 'Получить оргюнит по id' })
    @ApiResponse({ status: 200, type: OrgUnit })
    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.orgUnitService.getOrgUnitById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновление организационного подразделения' })
    @ApiResponse({ status: 200, type: OrgUnit })
    async updateOrgUnit(
        @Param('id') id: string,
        @Body() updateOrgUnitDto: UpdateOrgUnitDto,
    ) {
        return this.orgUnitService.updateOrgUnit(id, updateOrgUnitDto);
    }

    @ApiOperation({ summary: 'Удаление оргюнита по ID' })
    @ApiResponse({ status: 200, description: 'Оргюнит успешно удален' })
    @Delete('/:id')
    async deleteOrgUnit(@Param('id') id: string) {
        return this.orgUnitService.deleteOrgUnit(id);
    }
}
