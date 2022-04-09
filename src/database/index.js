import Sequelize from 'sequelize';

import config from '../config/database';

import User from '../models/User';
import Knowledge from '../models/Knowledge';
import KnowledgeList from '../models/KnowledgeList';

const models = [User, Knowledge, KnowledgeList];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
    this.authenticate();
  }

  async authenticate() {
    try {
      await this.connection.authenticate();
      console.log('📦 Connection has been established successfully.');
    } catch (err) {
      console.error('❌ Unable to connect to the database:', err);
    }
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }

  getConnection() {
    return this.connection;
  }
}

export default new Database();
