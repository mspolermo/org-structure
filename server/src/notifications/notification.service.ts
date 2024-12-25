import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotificationAd } from './notification.model';
import { User } from '../users/users.model';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(NotificationAd)
        private readonly notificationAdModel: typeof NotificationAd,
    ) {}

    async createNotification(userId: string, title: string, text: string) {
        try {
            return await this.notificationAdModel.create({
                userId,
                title,
                text,
            });
        } catch (error) {
            throw new Error('Ошибка при создании объявления: ' + error.message);
        }
    }

    async getAllNotifications(): Promise<NotificationAd[]> {
        return this.notificationAdModel.findAll();
    }

    async getNotificationById(id: string, userId: string) {
        const notification = await this.notificationAdModel.findOne({
            where: { id, userId },
            include: [User],
        });
        if (!notification) {
            throw new HttpException(
                'Объявление не найдено или доступ запрещён',
                HttpStatus.NOT_FOUND,
            );
        }
        return notification;
    }

    async updateNotification(
        id: string,
        userId: string,
        title: string,
        text: string,
    ) {
        const notification = await this.getNotificationById(id, userId);
        notification.title = title || notification.title;
        notification.text = text || notification.text;
        return await notification.save();
    }

    async deleteNotification(id: string, userId: string) {
        const notification = await this.getNotificationById(id, userId);
        //TODO: сделать чтоб другие могли удалять чужие объявления
        await notification.destroy();
        return { message: 'Объявление удалено' };
    }

    async getNotificationsByUser(userId: string): Promise<NotificationAd[]> {
        return this.notificationAdModel.findAll({ where: { userId } });
    }
}
