import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
    @ApiProperty({
        example: 'Продам велосипед',
        description: 'Заголовок объявления',
    })
    title: string;

    @ApiProperty({
        example: 'Велосипед в отличном состоянии, звоните!',
        description: 'Текст объявления',
    })
    text: string;
}
