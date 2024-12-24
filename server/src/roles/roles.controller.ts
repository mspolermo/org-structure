import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Роли пользователей')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({ summary: 'Создание роли пользователя' })
    @ApiResponse({ status: 200, type: Role })
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({ summary: 'Посмотреть все существующие роли' })
    @ApiResponse({ status: 200, type: [Role] })
    @Get()
    getAll() {
        return this.roleService.getAllRoles();
    }

    @ApiOperation({ summary: 'Получить роль пользователя' })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }

    @ApiOperation({ summary: 'Удалить роль' })
    @ApiResponse({ status: 200, description: 'Role deleted successfully' })
    @ApiResponse({
        status: 400,
        description: 'Cannot delete role as it is assigned to users',
    })
    @Delete('/:value')
    async delete(@Param('value') value: string) {
        await this.roleService.deleteRole(value);
        return { message: `Role with value "${value}" deleted successfully` };
    }
}
