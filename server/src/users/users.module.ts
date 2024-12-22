import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { Person } from 'src/persons/persons.model';
import { PersonsModule } from 'src/persons/persons.module';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationAd } from 'src/notifications/notification.model';
import { NotificationModule } from 'src/notifications/notifications.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([
            User,
            Role,
            UserRoles,
            Person,
            NotificationAd,
        ]),
        RolesModule,
        PersonsModule,
        forwardRef(() => NotificationModule),
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
