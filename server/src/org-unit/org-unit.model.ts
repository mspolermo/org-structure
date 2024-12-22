import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Person } from 'src/persons/persons.model';
import { v4 as uuid } from 'uuid';

interface OrgUnitCreationAttrs {
    name: string;
    description: string;
    nestingLevel?: number;
    workingHours?: string;
    lunchBreak?: string;
    summary?: string;
}

@Table({ tableName: 'orgunits' })
export class OrgUnit extends Model<OrgUnit, OrgUnitCreationAttrs> {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Уникальный GUID',
    })
    @Column({
        type: DataType.UUID,
        defaultValue: uuid,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    id: string;

    @ApiProperty({ example: 'Управление', description: 'Название отдела' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({
        example: 'Аппарат управления организацией',
        description: 'Описание отдела',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @ApiProperty({ example: 1, description: 'Уровень вложенности' })
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    nestingLevel: number;

    @ApiProperty({ example: '08.00-17.00', description: 'Рабочее время' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: '08.00-17.00',
    })
    workingHours: string;

    @ApiProperty({ example: '12.00-12.45', description: 'Обед' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: '12.00-12.45',
    })
    lunchBreak: string;

    @ApiProperty({
        example: 'Это подразденение для управления всеми управлениями',
        description: 'Дополнительная информация по оргюниту',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    summary: string;

    @HasMany(() => Person)
    persons: Person[];

    @ForeignKey(() => Person)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    chefId: string;

    @BelongsTo(() => Person, 'chefId')
    chef: Person;

    @HasMany(() => Person, {
        foreignKey: 'orgUnitId',
        constraints: false,
        scope: {
            isManager: true,
        },
    })
    managers: Person[];

    @ForeignKey(() => OrgUnit)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    parentOrgUnitId: string;

    @BelongsTo(() => OrgUnit, 'parentOrgUnitId')
    parentOrgUnit: OrgUnit;

    @HasMany(() => OrgUnit, 'parentOrgUnitId')
    childOrgUnitItems: OrgUnit[];
}
