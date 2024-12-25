import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavoritePerson } from './favorite-person.model';

import { UsersModule } from '../users/users.module';
import { PersonsModule } from '../persons/persons.module';
import { AuthModule } from 'src/auth/auth.module';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
    imports: [
        SequelizeModule.forFeature([FavoritePerson]),
        forwardRef(() => AuthModule),
        forwardRef(() => UsersModule),
        PersonsModule,
    ],
    providers: [FavoritesService],
    controllers: [FavoritesController],
    exports: [FavoritesService],
})
export class FavoritesModule {}
