import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
    @ApiProperty({
        example: 'Иванов Иван Иванович',
        description: 'ФИО сотрудника',
    })
    readonly name: string;

    @ApiProperty({
        example: 'person@gmail.com',
        description: 'Электронная почта',
    })
    readonly email: string;

    @ApiProperty({
        example: '22-04-11',
        description: 'Телефон',
    })
    readonly phone: string;

    @ApiProperty({ example: 'Корпус 1, каб. 5', description: 'Адрес' })
    readonly location: string;

    @ApiProperty({ example: '01.31.1990', description: 'Дата рождения' })
    readonly birthday: Date;

    @ApiProperty({ example: 'Инженер', description: 'Должность сотрудника' })
    readonly post: string;

    @ApiProperty({ example: 'А-103', description: 'Табельный номер' })
    readonly table: string;
}
