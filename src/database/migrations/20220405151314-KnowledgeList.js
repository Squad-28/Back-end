'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('knowledge_list', {
      id_user: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          key: 'id',
          model: 'users',
        },
      },
      id_knowledge: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          key: 'id',
          model: 'knowledges',
        },
      },
      score: {
        type: Sequelize.DataTypes.INTEGER(1).UNSIGNED.ZEROFILL,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('knowledge_list');
  },
};
