import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { PersonsModule } from './persons/persons.module';
import { Person } from './persons/persons.model';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { PersonDetales } from './persons/person-detales.model';
import { OrgUnitModule } from './org-unit/org-unit.module';
import { OrgUnit } from './org-unit/org-unit.model';
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [OrgUnit, Person, User, Role, UserRoles, PersonDetales],
            autoLoadModels: true,
        }),
        OrgUnitModule,
        PersonsModule,
        UsersModule,
        RolesModule,
        AuthModule,
    ],
})
export class AppModule {}
