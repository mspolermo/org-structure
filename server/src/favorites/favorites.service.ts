import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FavoritePerson } from './favorite-person.model';
import { Person } from '../persons/persons.model';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectModel(FavoritePerson)
        private favoritePersonRepository: typeof FavoritePerson,
    ) {}

    // Добавить персону в избранное
    async addFavorite(
        userId: string,
        personId: string,
    ): Promise<FavoritePerson> {
        const favorite = await this.favoritePersonRepository.create({
            userId,
            personId,
        });
        return favorite;
    }

    // Получить всех избранных персонажей пользователя
    async getFavorites(userId: string): Promise<FavoritePerson[]> {
        return this.favoritePersonRepository.findAll({
            where: { userId },
            include: [Person],
        });
    }

    // Удалить персону из избранного
    async removeFavorite(userId: string, personId: string): Promise<void> {
        const favorite = await this.favoritePersonRepository.findOne({
            where: { userId, personId },
        });

        if (!favorite) {
            throw new NotFoundException('Favorite person not found');
        }

        await favorite.destroy();
    }
}
