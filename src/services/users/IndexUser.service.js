class IndexUserService {
  #sequelize;
  #usersRepo;
  #knowledgeRepo;
  #knowledgeListRepo;

  constructor(sequelize, usersRepo, knowledgeRepo, knowledgeListRepo) {
    this.#sequelize = sequelize;
    this.#usersRepo = usersRepo;
    this.#knowledgeRepo = knowledgeRepo;
    this.#knowledgeListRepo = knowledgeListRepo;
  }

  async index() {
    try {
      const result = await this.#usersRepo.index();

      const users = this.#formatAllUsers(result);

      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  #formatAllUsers(usersSearched = []) {
    if (this.#arrayIsEmpty(usersSearched)) return [];

    const ids = this.#getIds(usersSearched);

    const usersWithoutKnowledges = this.#getUserDataById(ids, usersSearched);

    const usersWithKnowledges = this.#fillInUserKnowledge(
      usersWithoutKnowledges,
      usersSearched
    );

    return usersWithKnowledges;
  }

  #getUserDataById(ids, usersSearched) {
    let user = {};
    let userFound = {};

    const users = ids.map((id) => {
      userFound = usersSearched.find((userSearched) => userSearched.id === id);

      user = { ...userFound };

      delete user?.knowledge_name;
      delete user?.knowledge_score;

      return user;
    });

    return users;
  }

  #getIds(usersSearched) {
    let ids = new Set();

    usersSearched.forEach((userSearched) => {
      ids.add(userSearched.id);
    });

    return Array.from(ids);
  }

  #fillInUserKnowledge(users, usersSearched) {
    const usersWithKnowledges = users.map((user) => {
      const usersFilteredById = usersSearched.filter(
        (userSearched) => userSearched.id === user.id
      );

      const knowledges = usersFilteredById.map((userFiltered) => {
        const { knowledge_name: name, knowledge_score: score } = userFiltered;

        return {
          name,
          score,
        };
      });

      user.knowledges = knowledges;
      return user;
    });
    return usersWithKnowledges;
  }

  #arrayIsEmpty(array = []) {
    return array?.length <= 0;
  }
}

export default IndexUserService;
