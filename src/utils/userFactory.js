import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
faker.locale = 'pt_BR';

/**
 *
 * @param {*} userAmount por padrão o valor é 1
 * @param {*} knowledgeAmount por padrão o valor é 5
 * @returns
 */
export default function userFactory(userAmount = 1, knowledgeAmount = 5) {
  const users = [];
  for (let index = 1; index <= userAmount; index++) {
    users.push({
      id: uuidv4(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      level: faker.lorem.word(),
      description: faker.lorem.text(),
      contact: faker.lorem.text(),
      knowledge: knowledgeFactory(knowledgeAmount),
    });
  }

  return users;
}

export function knowledgeFactory(amount) {
  const knowledges = [];
  let randomNumber1to5 = 1;
  for (let index = 1; index <= amount; index++) {
    randomNumber1to5 = Math.floor(Math.random() * 5) + 1;
    knowledges.push({
      id: uuidv4(),
      name: faker.lorem.word(),
      score: randomNumber1to5,
    });
  }

  return knowledges;
}
