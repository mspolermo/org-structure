import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { User } from 'src/users/users.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getAllRoles() {
        const roles = await this.roleRepository.findAll();
        return roles.map((role) => ({
            value: role.value,
            description: role.description,
        }));
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({ where: { value } });
        return role;
    }

    async getUserRoles(userId: string) {
        const user = await User.findByPk(userId, {
            include: [Role],
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        // Возвращаем только value и description для каждой роли
        return user.roles.map((role) => ({
            value: role.value,
            description: role.description,
        }));
    }
}
