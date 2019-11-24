'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'confectioneries', 
      'password')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'confectioneries',
      'password',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  }
};
