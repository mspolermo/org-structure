import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { Person } from './persons.model';
import { User } from 'src/users/users.model';
import { PersonDetales } from './person-detales.model';
import { OrgUnit } from 'src/org-unit/org-unit.model';

@Module({
    controllers: [PersonsController],
    providers: [PersonsService],
    imports: [
        SequelizeModule.forFeature([Person, User, PersonDetales, OrgUnit]),
    ],
    exports: [PersonsService],
})
export class PersonsModule {}
