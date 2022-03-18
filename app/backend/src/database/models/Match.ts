import { Model, DataTypes } from 'sequelize';
import db from '.';
import Club from './Club';

class Match extends Model {
  declare id: number;

  declare homeTeam: number;

  declare homeTeamGoals: number;

  declare awayTeam:number;

  declare awayTeamGoals: number;

  declare inProgress:number;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  tableName: 'matchs',
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'match',
});

Match.hasMany(Club, { foreignKey: 'homeTeam' });
Match.hasMany(Club, { foreignKey: 'awayTeam' });

Club.belongsTo(Match, { foreignKey: 'homeTeam' });
Club.belongsTo(Match, { foreignKey: 'awayTeam' });

export default Match;
