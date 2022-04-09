import User from '../models/User';

const formatReturn = (result) => {
  const data = result.dataValues;
  delete data?.createdAt;
  delete data?.updatedAt;
  return data;
};

class UsersRepository {
  async findAll() {
    try {
      const result = await User.findAll();

      const arrrayEmpty = result.length <= 0;
      if (arrrayEmpty) return result;

      const users = result.map(formatReturn);

      // console.log('users: ', users);

      return users;
    } catch (error) {
      console.log('[ERRO NO BD, FIND ALL]: ' + error);
    }
  }

  // async findUserByIdWithKnowledges(){}
  // async findAllUserWithKnowledges(){}

  async create(user, transaction = null) {
    try {
      const instance = new User(user);
      let userSaved = await instance.save({ transaction });

      userSaved = formatReturn(userSaved);

      // console.log('user: ', userSaved);

      return userSaved;
    } catch (error) {
      console.log('[ERRO NO BD, CREATE]: ' + error);
    }
  }
}

export default new UsersRepository();
