export interface NotificationType {
    id: string;
    title: string;
    text: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NotificationCreateData extends Pick<
NotificationType,
    'title' |
    'text'
> {}

export interface NotificationUpdateData extends Pick<
NotificationType,
    'title' |
    'text' |
    'id'
> {}

