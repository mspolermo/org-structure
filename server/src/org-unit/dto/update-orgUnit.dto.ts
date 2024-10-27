import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrgUnitDto {
    @ApiProperty({ example: 'Управление', description: 'Название отдела' })
    readonly name?: string;

    @ApiProperty({
        example: 'Аппарат управления организацией',
        description: 'Описание отдела',
    })
    readonly description?: string;

    @ApiProperty({ example: '08.00-17.00', description: 'Рабочее время' })
    readonly workingHours?: string;

    @ApiProperty({ example: '12.00-12.45', description: 'Обед' })
    readonly lunchBreak?: string;

    @ApiProperty({
        example: 'Это подразденение для управления всеми управлениями',
        description: 'Дополнительная информация по оргюниту',
    })
    readonly summary?: string;

    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'ID родительского отдела',
    })
    readonly parentOrgUnitId?: string;

    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'ID начальника отдела',
    })
    readonly chefId?: string;
}
