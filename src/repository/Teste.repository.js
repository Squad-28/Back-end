import User from '../models/User';

async function findAll() {
  const results = User.findAll();

  return results;
}

async function hasExistsUsers() {
  const hasUser = User.findAll();

  return hasUser;
}

export const testeRespositories = {
  findAll,
  hasExistsUsers
}