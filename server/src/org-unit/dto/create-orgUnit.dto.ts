import { ApiProperty } from '@nestjs/swagger';

export class CreateOrgUnitDto {
    @ApiProperty({ example: 'Управление', description: 'Название отдела' })
    readonly name: string;

    @ApiProperty({
        example: 'Аппарат управления организацией',
        description: 'Описание отдела',
    })
    readonly description: string;

    @ApiProperty({
        example: 1,
        description: 'ID родительского оргЮнита (опционально)',
        required: false,
    })
    readonly parentOrgUnitId?: number;
}
