import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { TypeUser } from '../types/TypeUser';
import { TypeSkill } from '../types/TypeSkill';
import { UserLevel } from '../entities/User';
faker.locale = 'pt_BR';

const userLevel: any = {
  1: UserLevel.TREINEE,
  2: UserLevel.JUNIOR,
  3: UserLevel.PLENO,
  4: UserLevel.SENIOR
};

/**
 *
 * @param {*} userAmount por padrão o valor é 1
 * @param {*} knowledgeAmount por padrão o valor é 3
 * @returns
 */
export function fakeUser(userAmount = 1, skillAmount = 3): TypeUser[] {
  const users: TypeUser[] = [];
  let randomNumber1to4: number = 1;
  for (let index = 1; index <= userAmount; index++) {
    randomNumber1to4 = Math.floor(Math.random() * 4) + 1;
    users.push({
      id: uuidv4(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      level: userLevel[randomNumber1to4],
      description: faker.lorem.text(),
      skills: fakeSkill(skillAmount)
    });
  }

  return users;
}

export function fakeSkill(amount: number): TypeSkill[] {
  const skills: TypeSkill[] = [];
  let randomNumber1to5 = 1;
  for (let index = 1; index <= amount; index++) {
    randomNumber1to5 = Math.floor(Math.random() * 5) + 1;
    skills.push({
      id: uuidv4(),
      name: faker.lorem.words(3),
      score: randomNumber1to5
    });
  }

  return skills;
}
