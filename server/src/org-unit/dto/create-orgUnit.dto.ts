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
    readonly parentOrgUnitId?: string;

    @ApiProperty({
        example: '08.00-17.00',
        description: 'Рабочее время',
        required: false,
    })
    readonly workingHours?: string;

    @ApiProperty({
        example: '12.00-12.45',
        description: 'Обед',
        required: false,
    })
    readonly lunchBreak?: string;

    @ApiProperty({
        example: 'Это подразденение для управления всеми управлениями',
        description: 'Дополнительная информация по оргюниту',
        required: false,
    })
    readonly summary?: string;
}
