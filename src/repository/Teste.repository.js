import User from '../models/User';

class TesteRepository {
  async findAll() {
    const results = User.findAll();

    return results;
  }

  async hasExistsUsers() {
    const hasUser = User.findAll();

    return hasUser;
  }
}

export default new TesteRepository();
