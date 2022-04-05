import Sequelize from 'sequelize';

import config from '../config/database';

import User from '../App/models/user'
import Knowledge from '../App/models/knowledge'
import KnowledgeList from '../App/models/knowledgeList'

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
      console.error('❌ Unable to connect to the database:', error);
    }
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }
}

export default new Database();