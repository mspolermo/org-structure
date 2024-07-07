import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDetalesDto {
    @ApiProperty({
        example: 'Стол А43, стул Е54',
        description: 'Офисные предметы сотрудника',
    })
    readonly items: string;

    @ApiProperty({
        example: 'ПК -5432, Монитор - 3222',
        description: 'Техника сотрудника',
    })
    readonly hardware: string;

    @ApiProperty({
        example: 'Офисный пакет, ОС',
        description: 'Софт используемый сотрудником',
    })
    readonly software: string;

    @ApiProperty({
        example: 'Обеспечение безопастности',
        description: 'Внутреннее экзамены сотрудника',
    })
    readonly exams: string;
}
