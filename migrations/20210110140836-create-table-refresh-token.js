'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('refresh_tokens', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addConstraint('refresh_tokens',{
      type: 'foreign key',
      fields: ['user_id'],
      name: 'REFRESH_TOKENS__USER_ID',
      references: {
        table: 'users',
        field: 'id'
      }
    })

  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('refresh_tokens');
  }
};
