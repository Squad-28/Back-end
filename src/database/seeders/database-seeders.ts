import { User } from '../../entities/User';
import { TypeUser } from '../../types/TypeUser';
import { fakeUser } from '../../__tests__/generateMock';
import { Skill } from '../../entities/Skill';
import { names } from './skills-names';
import { DatabaseSingleton } from '..';
import bcrypt from 'bcrypt';
import { QueryRunner } from 'typeorm';
import { SkillList } from '../../entities/SkillList';

let usersEntities: User[] = [];
let skillsEntities: Skill[] = [];
let skillListEntities: SkillList[] = [];

const randomNumber = (max: number = 5) => Math.floor(Math.random() * max) + 1;

const startUserSeed = async (queryRunner: QueryRunner) => {
  const numberOfUser = 500;
  const emails = new Set();
  let user: TypeUser;
  for (let index = 1; index <= numberOfUser; ) {
    user = fakeUser()[0];
    if (emails.has(user.email)) {
      console.log('email igual.');
      continue;
    }
    emails.add(user.email);
    user.password = await bcrypt.hash(user.password, 8);
    usersEntities.push(new User().setAttributes(user));
    console.log(`user ${index} adicionado.`);
    index++;
  }

  const userRepository = queryRunner.manager.getRepository(User);
  console.log('inserindo users no banco...');
  await userRepository.save(usersEntities);
  console.log('users inseridos.');
  // console.log(usersEntities);
};

const startSkillSeed = async (queryRunner: QueryRunner) => {
  let skill: any = {};
  skillsEntities = names.map((name: string, index): Skill => {
    skill.name = name.replace(' ', '-').toLowerCase();
    console.log(`inserindo skill ${index}...`);
    return new Skill().setAttributes(skill);
  });

  const skillRepository = queryRunner.manager.getRepository(Skill);
  console.log('inserindo skills no banco.');
  await skillRepository.save(skillsEntities);
  console.log('skills inseridos.');
  // console.log(skillsEntities);
};

const startSkillListSeed = async (queryRunner: QueryRunner) => {
  const usersForRelationships = [...usersEntities];
  let skillsForRelationships = [...skillsEntities];

  //escolhe 10 skills pra ficar sem relacionamento
  const amountOfSkillToRemove = 10;
  for (let index = 1; index <= amountOfSkillToRemove; index++) {
    skillsForRelationships = skillsForRelationships.filter(
      (skill, index) => index !== randomNumber(50)
    );
  }

  let score: number;
  let numberOfSkills: number;
  let indexChosen: number;
  let skill: Skill;
  //seleciona os 350 primeiros usuarios que terao relacionamento
  usersForRelationships.some((user, userSkillListIndex) => {
    if (userSkillListIndex >= 350) return true;
    numberOfSkills = randomNumber(5);
    //seleciona aleatoriamente de 1 a 5 skills que o user tera
    for (
      let userSkillIndex = 1;
      userSkillIndex <= numberOfSkills;
      userSkillIndex++
    ) {
      score = randomNumber(5);
      indexChosen = randomNumber(50);
      skill = skillsEntities.find(
        (skill, indexSkill) => indexSkill === indexChosen
      );
      skillListEntities.push(new SkillList().setAttributes(user, skill, score));
      console.log(
        `inserindo skill list ${userSkillListIndex}, skill ${userSkillIndex}`
      );
    }
    return false;
  });

  const skillListRepository = queryRunner.manager.getRepository(SkillList);
  await skillListRepository.save(skillListEntities);
  console.log('skill list inseridos.');
};

const init = async () => {
  const dataSource = await DatabaseSingleton.getDataSourceInstance();
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await startUserSeed(queryRunner);
    await startSkillSeed(queryRunner);
    await startSkillListSeed(queryRunner);
    await queryRunner.commitTransaction();
  } catch (error) {
    console.log(error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

(async () => {
  await init();
})();
