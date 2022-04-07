import User from '../models/User';

const formatarRetorno = (result) => {
  const data = result.dataValues;
  delete data?.createdAt;
  delete data?.updatedAt;
  return data;
};

class UsersRepository {}

export default new UsersRepository();
