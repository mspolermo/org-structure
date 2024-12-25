import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { PersonsService } from 'src/persons/persons.service';
import { Person } from 'src/persons/persons.model';
import { FavoritesService } from 'src/favorites/favorites.service';
import { NotificationService } from 'src/notifications/notification.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService,
        private personsService: PersonsService,
        private favoritesService: FavoritesService,
        private notificationService: NotificationService,
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

    async deleteUser(personId: string) {
        // Найти пользователя по personId
        const user = await this.userRepository.findOne({
            where: { personId },
        });

        // Если пользователь не найден, выбросить исключение
        if (!user) {
            throw new HttpException(
                'Пользователь не найден',
                HttpStatus.NOT_FOUND,
            );
        }

        // Проверяем, есть ли у пользователя уведомления
        const userNotifications =
            await this.notificationService.getNotificationsByUser(user.id);

        if (userNotifications.length > 0) {
            throw new HttpException(
                'Невозможно удалить пользователя, так как у него есть созданные объявления.',
                HttpStatus.BAD_REQUEST,
            );
        }

        // Очистить избранное пользователя
        await this.favoritesService.removeAllFavoritesByUser(user.id);

        // Удалить пользователя
        await user.destroy();

        return { message: 'Пользователь успешно удален' };
    }
}
