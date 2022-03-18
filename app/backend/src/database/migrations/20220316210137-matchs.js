'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam : {
        type: Sequelize.INTEGER,
        allowNull: false,
        field:'home_team',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'clubs',
          key: 'id',
        },
      },
      homeTeamGoals : {
        type: Sequelize.INTEGER,
        field:'home_team_goals',
        allowNull: false,
      },
      awayTeam : {
        type: Sequelize.INTEGER,
        field:'away_team',
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'clubs',
          key: 'id',
        },
      },
      awayTeamGoals : {
        type: Sequelize.INTEGER,
        field:'away_team_goals',
        allowNull: false,
      },
      inProgress : {
        type: Sequelize.BOOLEAN,
        field:'in_progress',
        allowNull: false,
      }
  });
},

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('matchs');
  },
};
