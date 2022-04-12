const formatReturn = (result) => {
  const data = result.dataValues;
  delete data?.createdAt;
  delete data?.updatedAt;
  return data;
};

class UsersRepository {
  #User;
  #sequelize;
  constructor(User, sequelize) {
    this.#User = User;
    this.#sequelize = sequelize;
  }

  async index() {
    try {
      const query = `
        SELECT 
          u.id, u.name, u.email, u.description, u.level, k.name as knowledge_name, kl.score as knowledge_score
        FROM knowledge_list kl 
        JOIN users u ON kl.id_user = u.id 
        JOIN knowledges k ON kl.id_knowledge = k.id;`;

      const result = await this.#sequelize.query(query);

      const arrayEmpty = result?.length <= 0;
      if (arrayEmpty) return [];

      return result[0];
    } catch (error) {
      console.error('[ERRO NO BD, FIND ALL]: ' + error);
      throw error;
    }
  }

  // async findUserByIdWithKnowledges(){}
  // async findAllUserWithKnowledges(){}

  async create(user, transaction = null) {
    try {
      const instance = new this.#User(user);
      let userSaved = await instance.save({ transaction });

      userSaved = formatReturn(userSaved);

      return userSaved;
    } catch (error) {
      console.error('[ERRO NO BD, CREATE]: ' + error);
      throw error;
    }
  }
}

export default UsersRepository;
