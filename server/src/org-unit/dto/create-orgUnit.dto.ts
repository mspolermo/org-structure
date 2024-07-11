import { ApiProperty } from '@nestjs/swagger';

export class CreateOrgUnitDto {
    @ApiProperty({ example: 'Управление', description: 'Название отдела' })
    readonly name: string;

    @ApiProperty({
        example: 'Аппарат управления организацией',
        description: 'Описание отдела',
    })
    readonly description: string;
}
