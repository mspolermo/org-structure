import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

    @ApiProperty({ example: 'Корпус 1, каб. 5', description: 'Адрес' })
    readonly location: string;

    @ApiProperty({ example: '01.31.1990', description: 'Дата рождения' })
    readonly birthday: Date;

    @ApiProperty({ example: 'Инженер', description: 'Должность сотрудника' })
    readonly post: string;

    @ApiProperty({
        example: '2023-01-01',
        description: 'Дата приема на работу',
    })
    readonly employmentDate: Date;

    @ApiPropertyOptional({
        example: '343-15-41',
        description: 'Телефон',
    })
    readonly phone?: string;

    @ApiPropertyOptional({
        example: '15-41',
        description: 'Табельный номер',
    })
    readonly table?: string;

    @ApiProperty({ example: 1, description: 'ID организационного юнита' })
    readonly orgUnitId: string;

    @ApiProperty({ example: true, description: 'Начальник или нет' })
    readonly isChef: boolean;

    @ApiProperty({ example: true, description: 'Мэнэджер или нет' })
    readonly isManager: boolean;
}
