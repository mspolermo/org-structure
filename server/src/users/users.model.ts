import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Person } from 'src/persons/persons.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { uuid } from 'uuidv4';

interface UserCreationAttrs {
    email: string;
    password: string;
    personId?: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
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
        example: 'user@gmail.com',
        description: 'Электронная почта',
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @ApiProperty({ example: '12345678', description: 'Пароль' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @ForeignKey(() => Person)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    personId: string;

    @BelongsTo(() => Person)
    person: Person;
}
