import formatAllUsers from '../../utils/formatAllUsers';

class FindByIdUserService {
  #sequelize;
  #usersRepo;

  constructor(sequelize, usersRepo) {
    this.#sequelize = sequelize;
    this.#usersRepo = usersRepo;
  }

  async findById(id) {
    try {
      const result = await this.#usersRepo.findById(id);

      const [user] = formatAllUsers(result);

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default FindByIdUserService;
