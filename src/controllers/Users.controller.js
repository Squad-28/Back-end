import userFactory from '../utils/userFactory';
import UsersService from '../services/Users.service';

import User from '../models/User';
import Knowledge from '../models/Knowledge';
import KnowledgeList from '../models/KnowledgeList';

import Database from '../database';
import UsersRepository from '../repository/Users.repository';
import KnowledgeRepository from '../repository/Knowledge.repository';
import KnowledgeListRepository from '../repository/KnowledgeList.repository';

class UsersController {
  getUsersService() {
    const sequelize = new Database().getConnection();
    return new UsersService(
      sequelize,
      new UsersRepository(User),
      new KnowledgeRepository(Knowledge, sequelize),
      new KnowledgeListRepository(KnowledgeList)
    );
  }

  async create(req, res) {
    // const user = userFactory()[0];
    const { user } = req.body;

    try {
      const sequelize = new Database().getConnection();
      const userService = new UsersService(
        sequelize,
        new UsersRepository(User),
        new KnowledgeRepository(Knowledge, sequelize),
        new KnowledgeListRepository(KnowledgeList)
      );
      const newUser = await userService.create(user);

      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default UsersController;
