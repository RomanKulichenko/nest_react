import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'User' })
export class UsersModel extends Model<UsersModel, UserCreationAttrs> {

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password: string;
}