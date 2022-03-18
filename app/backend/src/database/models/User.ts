import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;

  declare username: string;

  declare role: string;

  declare password: string;

  declare email: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;
