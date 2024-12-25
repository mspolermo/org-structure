import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FavoritesService } from 'src/favorites/favorites.service';
import { NotificationService } from 'src/notifications/notification.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private favoritesService: FavoritesService,
        private notificationService: NotificationService,
    ) {}

    //TODO: выпилить, теперь создается через auth\registration который ведет в этот сервис, шифруя пароль
    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() usersDto: CreateUserDto) {
        return this.usersService.createUser(usersDto);
    }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Получить пользователя по email' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(JwtAuthGuard)
    @Get('/mail/:email')
    getByEmail(@Param('email') email: string) {
        return this.usersService.getUserByEmail(email);
    }

    @ApiOperation({ summary: 'Удаление пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь удален' })
    @ApiResponse({
        status: 400,
        description: 'У пользователя есть уведомления',
    })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') userId: string) {
        // Удаляем все записи из избранного пользователя
        await this.favoritesService.removeAllFavoritesByUser(userId);

        // Удаляем пользователя
        await this.usersService.deleteUser(userId);

        return { message: 'Пользователь успешно удален' };
    }
}
