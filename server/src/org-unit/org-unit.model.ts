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

interface OrgUnitCreationAttrs {
    name: string;
    description: string;
}

@Table({ tableName: 'orgunits' })
export class OrgUnit extends Model<OrgUnit, OrgUnitCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Управление', description: 'Название отдела' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({
        example: 'Аппарат управления организацией',
        description: 'Описание отдела',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    description: string;

    @HasMany(() => Person)
    persons: Person[];

    @ForeignKey(() => Person)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    chefId: number;

    @BelongsTo(() => Person, 'chefId')
    chef: Person;
}
