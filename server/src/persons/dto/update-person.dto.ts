import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
    @ApiProperty({
        example: 'Иванов Иван Иванович',
        description: 'ФИО сотрудника',
        required: false,
    })
    readonly name?: string;

    @ApiProperty({
        example: 'person@gmail.com',
        description: 'Электронная почта',
        required: false,
    })
    readonly email?: string;

    @ApiProperty({
        example: 'Корпус 1, каб. 5',
        description: 'Адрес',
        required: false,
    })
    readonly location?: string;

    @ApiProperty({
        example: '01.31.1990',
        description: 'Дата рождения',
        required: false,
    })
    readonly birthday?: Date;

    @ApiProperty({
        example: 'Инженер',
        description: 'Должность сотрудника',
        required: false,
    })
    readonly post?: string;

    @ApiProperty({
        example: '2023-01-01',
        description: 'Дата приема на работу',
        required: false,
    })
    readonly employmentDate?: Date;

    @ApiProperty({
        example: '343-15-41',
        description: 'Телефон',
        required: false,
    })
    readonly phone?: string;

    @ApiProperty({
        example: '15-41',
        description: 'Табельный номер',
        required: false,
    })
    readonly table?: string;

    @ApiProperty({
        example: true,
        description: 'Начальник или нет',
        required: false,
    })
    readonly isChef?: boolean;

    @ApiProperty({
        example: true,
        description: 'Мэнэджер или нет',
        required: false,
    })
    readonly isManager?: boolean;

    @ApiProperty({
        example: 'guid',
        description: 'ID организационного юнита',
        required: false,
    })
    readonly orgUnitId?: string;
}
