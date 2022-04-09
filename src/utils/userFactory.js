import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
faker.locale = 'pt_BR';

/**
 *
 * @param {*} amount por padrão o valor é 1
 * @returns
 */
function userFactory(amount = 1) {
  const users = [];
  for (let index = 1; index <= amount; index++) {
    users.push({
      id: uuidv4(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      level: faker.lorem.word(),
      description: faker.lorem.text(),
      contact: faker.lorem.text(),
      knowledge: knowledgeFactory(),
    });
  }

  return users;
}

function knowledgeFactory(amount = 2) {
  const knowledges = [];
  let randomNumber1to5 = 1;
  for (let index = 1; index <= amount; index++) {
    randomNumber1to5 =
      Math.floor(Math.random() * 5) +
      1 /
        knowledges.push({
          id: uuidv4(),
          name: faker.lorem.word(),
          score: randomNumber1to5,
        });
  }

  return knowledges;
}

export default userFactory;
