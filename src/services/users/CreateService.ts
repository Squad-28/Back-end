import bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import UserRepository from '../../repositories/UserRepository';
import SkillRepository from '../../repositories/SkillRepository';
import SkillListRepository from '../../repositories/SkillListRepository';
import { TypeUser } from '../../types/TypeUser';
import { User, UserLevel } from '../../entities/User';
import { Skill } from '../../entities/Skill';
import { SkillList } from '../../entities/SkillList';
import ExistingEmailError from '../../errors/ExistingEmailError';
import { TypeSkill } from '../../types/TypeSkill';

class CreateService {
  constructor(
    private dataSource: DataSource,
    private userRepository: UserRepository,
    private skillRepository: SkillRepository,
    private skillListRepository: SkillListRepository
  ) {}

  async create(user: TypeUser): Promise<TypeUser> {
    const queryRunner = this.dataSource.createQueryRunner();

    await this.verifyIfEmailExists(user.email);

    const newUser = await this.generateUserEntity(user);

    const { newSkillArray, newSkillListArray } =
      await this.generateSkillAndSkillListEntity(newUser, user.skills);

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createdUser = await this.userRepository.create(
        newUser,
        queryRunner
      );

      if (newSkillArray) {
        await this.skillRepository.create(newSkillArray, queryRunner);
      }

      let skillListSaved = undefined;
      if (newSkillListArray) {
        skillListSaved = await this.skillListRepository.create(
          newSkillListArray,
          queryRunner
        );
      }

      const formattedUser = this.formatReturn(createdUser, skillListSaved);

      await queryRunner.commitTransaction();
      return formattedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async generateUserEntity(user: TypeUser): Promise<User> {
    user.password = await bcrypt.hash(user.password, 8);
    user.level = user.level as UserLevel;

    const newUser = new User();
    newUser.setAttributes(user);

    return newUser;
  }

  private async generateSkillAndSkillListEntity(
    userEntity: User,
    skills: TypeSkill[]
  ): Promise<any> {
    if (this.arrayIsEmpty(skills))
      return {
        newSkillArray: undefined,
        newSkillListArray: undefined
      };

    const existingSkills = await this.findExistingSkills(skills);

    const newSkillArray: Skill[] = [];
    const newSkillListArray: SkillList[] = [];
    let newSkill: Skill, newSkillList: SkillList;
    let existingSkill: TypeSkill;

    skills.forEach((skill) => {
      skill.name = skill.name.toUpperCase();

      newSkill = new Skill();
      newSkill.setAttributes(skill);

      existingSkill = existingSkills.find(
        (existingSkill) => existingSkill.name === skill.name
      );

      if (!existingSkill) {
        newSkillArray.push(newSkill);
      } else {
        newSkill.id = existingSkill.id;
      }

      newSkillList = new SkillList();
      newSkillList.setAttributes(userEntity, newSkill, skill.score);
      newSkillListArray.push(newSkillList);
    });

    return {
      newSkillArray,
      newSkillListArray
    };
  }

  private async findExistingSkills(skills: TypeSkill[]): Promise<any[]> {
    const names = skills
      .map((skill) => `'${skill.name.toUpperCase()}'`)
      .join(',');

    const existingSkills = await this.skillRepository.findByName(names);

    return this.arrayIsEmpty(existingSkills) ? [] : existingSkills;
  }

  private async verifyIfEmailExists(email: string): Promise<void> {
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists) throw new ExistingEmailError();
  }

  private formatReturn(
    user: TypeUser,
    skillListCreated?: SkillList[]
  ): TypeUser {
    delete user.createdAt;
    delete user.updatedAt;
    delete user.password;

    if (!user.description) {
      delete user.description;
    }

    if (!skillListCreated) return user;

    user.skills = skillListCreated.map((skillList) => ({
      name: skillList.skill.name,
      score: skillList.score
    }));

    return user;
  }

  private arrayIsEmpty(array: any = []) {
    return array?.length <= 0;
  }
}

export default CreateService;
