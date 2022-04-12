import userFactory from '../utils/userFactory';

import User from '../models/User';
import Knowledge from '../models/Knowledge';
import KnowledgeList from '../models/KnowledgeList';

import Database from '../database';
import UsersRepository from '../repository/Users.repository';
import KnowledgeRepository from '../repository/Knowledge.repository';
import KnowledgeListRepository from '../repository/KnowledgeList.repository';
import IndexUsersService from '../services/users/IndexUsersService';
import CreateUsersService from '../services/users/CreateUsersService';

class UsersController {
  getCreateUsersService() {
    const sequelize = new Database().getConnection();

    return new CreateUsersService(
      sequelize,
      new UsersRepository(User),
      new KnowledgeRepository(Knowledge, sequelize),
      new KnowledgeListRepository(KnowledgeList)
    );
  }

  async create(req, res) {
    const user = userFactory()[0];
    // const { user } = req.body;

    try {
      const sequelize = new Database().getConnection();
      const createUsersService = new CreateUsersService(
        sequelize,
        new UsersRepository(User),
        new KnowledgeRepository(Knowledge, sequelize),
        new KnowledgeListRepository(KnowledgeList)
      );
      const newUser = await createUsersService.create(user);

      const service = this.getCreateUsersService();
      await service.create(user);

      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async index(req, res) {
    try {
      const sequelize = new Database().getConnection();
      const indexUsersService = new IndexUsersService(
        sequelize,
        new UsersRepository(User, sequelize)
      );
      const users = await indexUsersService.index();

      return res.status(201).json(users);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default UsersController;
