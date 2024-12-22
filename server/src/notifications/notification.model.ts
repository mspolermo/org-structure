import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

interface NotificationAdCreationAttrs {
    userId: string;
    title: string;
    text: string;
}

@Table({ tableName: 'notification' })
export class NotificationAd extends Model<
    NotificationAd,
    NotificationAdCreationAttrs
> {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Уникальный ID объявления',
    })
    @Column({
        type: DataType.UUID,
        defaultValue: uuid,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @ApiProperty({
        example: 'Заголовок объявления',
        description: 'Заголовок объявления',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({
        example: 'Текст объявления',
        description: 'Текст объявления',
    })
    @Column({ type: DataType.STRING, allowNull: false })
    text: string;

    @BelongsTo(() => User)
    user: User;
}
