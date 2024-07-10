import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface OrgUnitCreationAttrs {
    name: string;
    description: string;
}

@Table({ tableName: 'orgunits' })
export class OrgUnit extends Model<OrgUnit, OrgUnitCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
    name: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    description: string;
}
