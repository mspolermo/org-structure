import { forwardRef, Module } from '@nestjs/common';
import { OrgUnitService } from './org-unit.service';
import { OrgUnitController } from './org-unit.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrgUnit } from './org-unit.model';
import { Person } from 'src/persons/persons.model';
import { AuthModule } from 'src/auth/auth.module';
import { PersonsModule } from 'src/persons/persons.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
    providers: [OrgUnitService],
    controllers: [OrgUnitController],
    imports: [
        SequelizeModule.forFeature([OrgUnit, Person]),
        forwardRef(() => AuthModule),
        PersonsModule,
        FavoritesModule,
    ],
    exports: [OrgUnitService],
})
export class OrgUnitModule {}
