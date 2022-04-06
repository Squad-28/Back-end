import User from '../models/user';

class TestController {
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
}

export default new TestController();