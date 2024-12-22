import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Request,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
@UseGuards(JwtAuthGuard) // Защита маршрутов через JWT
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post()
    async createNotification(
        @Request() req,
        @Body(new ValidationPipe())
        createNotificationDto: CreateNotificationDto,
    ) {
        const userId = req.user.id;
        const { title, text } = createNotificationDto;
        return await this.notificationService.createNotification(
            userId,
            title,
            text,
        );
    }

    @Get()
    async getAllNotifications() {
        return await this.notificationService.getAllNotifications();
    }

    @Get(':id')
    async getNotificationById(@Request() req, @Param('id') id: string) {
        const userId = req.user.id;
        return await this.notificationService.getNotificationById(id, userId);
    }

    @Put(':id')
    async updateNotification(
        @Request() req,
        @Param('id') id: string,
        @Body() body: { title: string; text: string },
    ) {
        const { title, text } = body;
        const userId = req.user.id;
        return await this.notificationService.updateNotification(
            id,
            userId,
            title,
            text,
        );
    }

    @Delete(':id')
    async deleteNotification(@Request() req, @Param('id') id: string) {
        const userId = req.user.id;
        return await this.notificationService.deleteNotification(id, userId);
    }
}
