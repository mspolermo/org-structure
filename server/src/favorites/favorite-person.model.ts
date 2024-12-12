import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Person } from '../persons/persons.model';

@Table({ tableName: 'favorite_persons' })
export class FavoritePerson extends Model<FavoritePerson> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @ForeignKey(() => Person)
    @Column({ type: DataType.UUID })
    personId: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Person)
    person: Person;
}
