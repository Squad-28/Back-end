import Sequelize from 'sequelize';

import config from '../config/database';

import User from '../models/User';
import Knowledge from '../models/Knowledge';
import KnowledgeList from '../models/KnowledgeList';

class Database {
  #sequelize;
  #models;

  constructor() {
    this.#sequelize = new Sequelize(config);
    this.#models = [KnowledgeList, User, Knowledge];
  }

  async start() {
    this.#initModels();
    await this.#authenticate();
    return this.#sequelize;
  }

  async close() {
    await this.#sequelize.close();
  }

  async #authenticate() {
    try {
      await this.#sequelize.sync();
      await this.#sequelize.authenticate();
      console.log('📦 Connection has been established successfully.');
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
    }
  }

  #initModels() {
    this.#models.forEach((model) => model.init(this.#sequelize));
  }

  getConnection() {
    return this.#sequelize;
  }

  getModels() {
    return this.#models;
  }
}

export default Database;
