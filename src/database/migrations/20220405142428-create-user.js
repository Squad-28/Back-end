'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.createTable('users', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   name: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    //   },
    //   email: {
    //     type: Sequelize.STRING,
    //     unique: true,
    //     allowNull: false
    //   },
    //   password: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    //   },
    //   level: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    //   },
    //   description: {
    //     type: Sequelize.STRING
    //   },
    //   created_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updated_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    // });
  },
  
  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable('users');
  }
};