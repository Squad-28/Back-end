import User from '../models/User';

const formatReturn = (result) => {
  const data = result.dataValues;
  delete data?.createdAt;
  delete data?.updatedAt;
  return data;
};

class UsersRepository {
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
