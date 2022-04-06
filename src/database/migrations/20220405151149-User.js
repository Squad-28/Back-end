'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      level: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
