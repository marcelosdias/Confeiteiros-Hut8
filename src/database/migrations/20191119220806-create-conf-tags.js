'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('conf_tags', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        tag_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'tags', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        confectionery_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'confectioneries', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('conf_tags');
  }
};
