import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { User } from 'src/users/users.model';
import { Op } from 'sequelize';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role) private roleRepository: typeof Role,
        @InjectModel(User) private userRepository: typeof User,
    ) {}

    async createRole(dto: CreateRoleDto) {
        // Приводим value к верхнему регистру и очищаем от цифр и символов
        const cleanedValue = dto.value
            .toUpperCase() // Преобразуем в верхний регистр
            .replace(/[^A-Z]/g, ''); // Удаляем все символы, кроме букв

        // Проверка наличия роли с таким же значением value
        const existingRole = await this.roleRepository.findOne({
            where: {
                value: {
                    [Op.iLike]: cleanedValue, // Используем iLike для регистронезависимого сравнения
                },
            },
        });

        if (existingRole) {
            throw new HttpException(
                `Role with value "${cleanedValue}" already exists`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const role = await this.roleRepository.create({
            ...dto,
            value: cleanedValue,
        });

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

    async deleteRole(roleValue: string): Promise<void> {
        // Проверяем, есть ли пользователи с этой ролью
        const usersWithRole = await User.findAll({
            include: {
                model: Role,
                where: {
                    value: {
                        [Op.iLike]: roleValue, // Используем iLike для регистронезависимого поиска
                    },
                },
            },
        });

        if (usersWithRole.length > 0) {
            throw new HttpException(
                `Cannot delete role "${roleValue}" as it is assigned to users.`,
                HttpStatus.BAD_REQUEST,
            );
        }

        // Если роли нет у пользователей, то удаляем роль
        const role = await this.roleRepository.findOne({
            where: { value: roleValue },
        });

        if (!role) {
            throw new NotFoundException(
                `Role with value "${roleValue}" not found`,
            );
        }

        await role.destroy();
    }

    async assignRoleToUser(personId: string, roleValue: string) {
        // Находим пользователя

        const user = await this.userRepository.findOne({
            where: { personId },
            include: [Role],
        });

        if (!user) {
            throw new NotFoundException(`User with ID "${user.id}" not found`);
        }

        // Находим роль
        const role = await this.getRoleByValue(roleValue);

        if (!role) {
            throw new NotFoundException(
                `Role with value "${roleValue}" not found`,
            );
        }

        // Проверяем, есть ли уже такая роль у пользователя
        const hasRole = user.roles.some((userRole) => userRole.id === role.id);

        if (hasRole) {
            throw new HttpException(
                `User already has role "${roleValue}"`,
                HttpStatus.BAD_REQUEST,
            );
        }

        await user.$set('roles', [role.id]);

        return {
            message: `Role "${roleValue}" assigned to user with ID "${user.id}"`,
        };
    }
}
