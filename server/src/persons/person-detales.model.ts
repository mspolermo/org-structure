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
import { uuid } from 'uuidv4';

interface PersonDetalesCreationAttrs {
    items: string;
    hardware: string;
    software: string;
    exams: string;
    personId: string;
}

@Table({ tableName: 'person_detales' })
export class PersonDetales extends Model<
    PersonDetales,
    PersonDetalesCreationAttrs
> {
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
    @Column({ type: DataType.UUID, unique: true })
    personId: string;

    @BelongsTo(() => Person)
    person: Person;
}
