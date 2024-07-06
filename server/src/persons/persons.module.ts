import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { Person } from './persons.model';
import { User } from 'src/users/users.model';

@Module({
    controllers: [PersonsController],
    providers: [PersonsService],
    imports: [SequelizeModule.forFeature([Person, User])],
    exports: [PersonsService],
})
export class PersonsModule {}
