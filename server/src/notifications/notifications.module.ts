import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from 'src/auth/auth.module';
import { NotificationAd } from './notification.model';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        SequelizeModule.forFeature([NotificationAd]),
        forwardRef(() => AuthModule),
        forwardRef(() => UsersModule),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
