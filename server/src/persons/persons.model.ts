import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { PersonDetales } from './person-detales.model';
import { OrgUnit } from 'src/org-unit/org-unit.model';
import { uuid } from 'uuidv4';

interface PersonsCreationAttrs {
    name: string;
    email: string;
    location: string;
    birthday: Date;
    post: string;
    employmentDate: Date;
}

@Table({ tableName: 'persons' })
export class Person extends Model<Person, PersonsCreationAttrs> {
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
        example: 'Иванов Иван Иванович',
        description: 'ФИО сотрудника',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        example: 'person@gmail.com',
        description: 'Электронная почта',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @ApiProperty({
        example: '343-15-41',
        description: 'Телефон',
    })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    phone: string;

    @ApiProperty({ example: 'Корпус 1, каб. 5', description: 'Адрес' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location: string;

    @ApiProperty({ example: '01.31.1990', description: 'Дата рождения' })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    birthday: Date;

    @ApiProperty({ example: 'Инженер', description: 'Должность сотрудника' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    post: string;

    @ApiProperty({ example: '15-41', description: 'Табельный номер' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    table: string;

    @ApiProperty({
        example: '2023-01-01',
        description: 'Дата приема на работу',
    })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    employmentDate: Date;

    @ApiProperty({ example: false, description: 'Начальник или нет' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isChef: boolean;

    @ApiProperty({ example: false, description: 'Мэнэджер или нет' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isManager: boolean;

    @HasOne(() => User)
    user: User;

    @HasOne(() => PersonDetales)
    personDetales: PersonDetales;

    @ForeignKey(() => OrgUnit)
    @Column({ type: DataType.UUID })
    orgUnitId: string;

    @BelongsTo(() => OrgUnit)
    orgUnit: OrgUnit;
}
