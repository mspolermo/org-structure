import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Person } from 'src/persons/persons.model';

interface PersonDetalesCreationAttrs {
    items: string;
    hardware: string;
    software: string;
    exams: string;
    personId: number;
}

@Table({ tableName: 'person_detales' })
export class PersonDetales extends Model<
    PersonDetales,
    PersonDetalesCreationAttrs
> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 'Стол А43, стул Е54',
        description: 'Офисные предметы сотрудника',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    items: string;

    @ApiProperty({
        example: 'ПК -5432, Монитор - 3222',
        description: 'Техника сотрудника',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    hardware: string;

    @ApiProperty({
        example: 'Офисный пакет, ОС',
        description: 'Софт используемый сотрудником',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    software: string;

    @ApiProperty({
        example: 'Обеспечение безопастности',
        description: 'Внутреннее экзамены сотрудника',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    exams: string;

    @ForeignKey(() => Person)
    @Column({ type: DataType.INTEGER, unique: true })
    personId: number;

    @BelongsTo(() => Person)
    person: Person;
}
