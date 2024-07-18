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

interface PersonsCreationAttrs {
    name: string;
    email: string;
    phone: string;
    location: string;
    birthday: Date;
    post: string;
    table: string;
}

@Table({ tableName: 'persons' })
export class Person extends Model<Person, PersonsCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

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
        example: '22-04-11',
        description: 'Телефон',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
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

    @ApiProperty({ example: 'А-103', description: 'Табельный номер' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    table: string;

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
    @Column({ type: DataType.INTEGER })
    orgUnitId: number;

    @BelongsTo(() => OrgUnit)
    orgUnit: OrgUnit;
}
