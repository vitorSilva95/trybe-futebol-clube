import { Model, DataTypes } from 'sequelize';
import db from '.';

class Club extends Model {
  declare id: number;

  declare clubName: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'club_name',
  },
}, {
  tableName: 'clubs',
  underscored: true,
  sequelize: db,
  modelName: 'club',
  timestamps: false,
});

export default Club;
