import formatAllUsers from '../../utils/formatAllUsers';

class IndexUserService {
  #sequelize;
  #usersRepo;

  constructor(sequelize, usersRepo) {
    this.#sequelize = sequelize;
    this.#usersRepo = usersRepo;
  }

  async index() {
    try {
      const result = await this.#usersRepo.index();

      const users = formatAllUsers(result);

      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default IndexUserService;
