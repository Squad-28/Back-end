import User from '../models/user';

class UsersController {
  async index(req, res) {
    try {
      const users = await User.findAll();

      if (users < 1) {
        return res.status(200).json({ message: 'There are no registered users.' });
      }

      return res.json(users);

    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Internal server error.' });

    }
  }

  async show(req, res) {
    try {
      
      
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async create(req, res) {
    try {
      
      
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async update(req, res) {
    try {
      
      
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async destroy(req, res) {
    try {
      
      
    } catch (err) {
      console.error(err);

      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new UsersController();