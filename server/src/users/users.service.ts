import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { PersonsService } from 'src/persons/persons.service';
import { Person } from 'src/persons/persons.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService,
        private personsService: PersonsService,
    ) {}

    async createUser(dto: CreateUserDto) {
        const person = await this.personsService.getPersonByEmail(dto.email);
        if (!person) {
            throw new HttpException(
                'Сотрудник с данным email не найден',
                HttpStatus.BAD_REQUEST,
            );
        }

        const candidate = await this.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException(
                'Пользователь с таким email уже существует',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.userRepository.create({
            ...dto,
            personId: person.id,
        });
        const role = await this.rolesService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        //TODO: добавить шифрование пароля
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: [{ all: true }, { model: Person }],
        });

        const result = users.map((user) => ({
            id: user.person.id,
            name: user.person.name,
            email: user.email,
            roles: user.roles.map((role) => ({
                value: role.value,
                description: role.description,
            })),
            allowDeveloperTools: user.roles.some(
                (role) => role.value === 'ADMIN',
            ),
        }));

        return result;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: [{ all: true }, { model: Person }],
        });
        return user;
    }
}
