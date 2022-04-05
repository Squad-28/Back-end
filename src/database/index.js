import Sequelize from 'sequelize';

import config from '../config/database';

import User from '../App/models/user'

const models = [User];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
    this.associate();
    this.authenticate();
  }

  async authenticate() {
    try {
      await this.connection.authenticate();
      console.log('📦 Connection has been established successfully.');

    } catch (err) {
      console.error('❌ Unable to connect to the database:', error);
    }
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models)
      }
    });
  }
}

export default new Database();