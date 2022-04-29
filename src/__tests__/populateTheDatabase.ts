import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { DatabaseSingleton } from '../database';
import { Skill } from '../entities/Skill';
import { SkillList } from '../entities/SkillList';
import { User } from '../entities/User';
import { fakeUser, fakeSkill } from './generateMock';

export async function insertUserIntoDatabase(amount = 5) {
  const dataSource = await DatabaseSingleton.getDataSourceInstance();

  const users = fakeUser(amount);
  const userEntities = users.map((user) => {
    return new User().setAttributes(user);
  });

  const userRepository = dataSource.getRepository(User);

  await userRepository.save(userEntities);
}

export async function insertSkillIntoDatabase(amount = 5) {
  const dataSource = await DatabaseSingleton.getDataSourceInstance();

  const skills = fakeSkill(amount);
  const skillEntities = skills.map((skill) => {
    return new Skill().setAttributes(skill);
  });

  const skillRepository = dataSource.getRepository(Skill);

  await skillRepository.save(skillEntities);
}

export async function populateTheDatabase() {
  const mockUsers = fakeUser(12, 4);

  const userEntities: User[] = [];
  const skillEntities: Skill[] = [];
  const skillListEntities: SkillList[] = [];

  let userEntity: User;
  let skillEntity: Skill;
  let skillListEntity: SkillList;

  const skillsSet = new Set();

  //cria lista de skills, aleatorio de quantos skills user tem, quais skill dos criados ele tera
  const promises = mockUsers.map(async (mockUser) => {
    mockUser.password = await bcrypt.hash(mockUser.password, 8);

    userEntity = new User();
    userEntity.setAttributes(mockUser);

    mockUser.skills.forEach((skill) => {
      skill.name = skill.name.toUpperCase();

      skillEntity = new Skill();
      skillEntity.setAttributes(skill);

      skillListEntity = new SkillList();
      skillListEntity.setAttributes(userEntity, skillEntity, skill.score);

      if (!skillsSet.has(skill.name)) {
        skillsSet.add(skill.name);
        skillEntities.push(skillEntity);
      } else {
        skillEntity.name = faker.company.companyName();
        skillEntities.push(skillEntity);
      }

      skillListEntities.push(skillListEntity);
    });

    userEntities.push(userEntity);
  });

  await Promise.all(promises);

  await insertIntoDatabase(userEntities, skillEntities, skillListEntities);
}

async function insertIntoDatabase(
  userEntities: User[],
  skillEntities: Skill[],
  skillListEntities: SkillList[]
) {
  const dataSource = await DatabaseSingleton.getDataSourceInstance();

  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const userRepository = queryRunner.manager.getRepository(User);
    const skillRepository = queryRunner.manager.getRepository(Skill);
    const skillListRepository = queryRunner.manager.getRepository(SkillList);

    await userRepository.save(userEntities);
    await skillRepository.save(skillEntities);
    await skillListRepository.save(skillListEntities);

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
}
