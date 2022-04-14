import User from '../models/User';
import Knowledge from '../models/Knowledge';
import KnowledgeList from '../models/KnowledgeList';

import Database from '../database';
import UserRepository from '../repositories/User.repository';
import KnowledgeRepository from '../repositories/Knowledge.repository';
import KnowledgeListRepository from '../repositories/KnowledgeList.repository';
import IndexUserService from '../services/users/IndexUser.service';
import FindByIdUserService from '../services/users/FindByIdUser.service';
import CreateUserService from '../services/users/CreateUser.service';

class UserController {
  async create(req, res) {
    const { user } = req.body;

    try {
      const sequelize = new Database().getConnection();
      const createUsersService = new CreateUserService(
        sequelize,
        new UserRepository(User),
        new KnowledgeRepository(Knowledge, sequelize),
        new KnowledgeListRepository(KnowledgeList)
      );
      await createUsersService.create(user);

      return res.status(201).json();
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async index(req, res) {
    try {
      const sequelize = new Database().getConnection();
      const indexUsersService = new IndexUserService(
        sequelize,
        new UserRepository(User, sequelize)
      );
      const users = await indexUsersService.index();

      return res.status(200).json({ users });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async findById(req, res) {
    const { id } = req.params;

    try {
      const sequelize = new Database().getConnection();
      const findByIdUserService = new FindByIdUserService(
        sequelize,
        new UserRepository(User, sequelize)
      );
      const user = await findByIdUserService.findById(id);

      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default UserController;
