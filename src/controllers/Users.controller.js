import { v4 as uuidv4 } from 'uuid';
import User from '../models/User';
import service from '../services/Users.service';
import userFactory from '../utils/userFactory';

class UsersController {
  async index(req, res) {
    try {
      const users = await User.findAll();

      if (users < 1) {
        return res
          .status(200)
          .json({ message: 'There are no registered users.' });
      }

      return res.json(users);
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json();
      }

      return res.json(user);
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, level, description } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json();
      }

      // const encryptedPassword = await createPasswordHash(password);

      await user.update({
        name,
        email,
        password,
        level,
        description,
      });

      return res.status(200).json();
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new UsersController();
