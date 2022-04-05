'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: 's3cr3t',
      level: 'junior',
      description: 'text',
      created_at: new Date,
      updated_at: new Date
    }]);
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
  }
};
