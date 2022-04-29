import {
  describe,
  test,
  expect,
  afterAll,
  beforeAll,
  afterEach
} from '@jest/globals';
import { DataSource } from 'typeorm';
import { DatabaseSingleton } from '../../../../database';
import { User } from '../../../../entities/User';
import SkillListRepository from '../../../../repositories/SkillListRepository';
import SkillRepository from '../../../../repositories/SkillRepository';
import UserRepository from '../../../../repositories/UserRepository';
import CreateService from '../../../../services/users/CreateService';
import ExistingEmailError from '../../../../errors/ExistingEmailError';
import { fakeUser } from '../../../generateMock';
import { Skill } from '../../../../entities/Skill';
import { SkillList } from '../../../../entities/SkillList';

describe('services.CreateUser', () => {
  beforeAll(async () => await DatabaseSingleton.connect());
  afterAll(async () => await DatabaseSingleton.close());

  afterEach(async () => {
    await (await DatabaseSingleton.getDataSourceInstance()).synchronize(true);
  });

  describe('#create', () => {
    let dataSource: DataSource;
    let service: CreateService;
    let classSkillListRepository: SkillListRepository;

    beforeAll(async () => {
      dataSource = await DatabaseSingleton.getDataSourceInstance();

      classSkillListRepository = new SkillListRepository();
      service = new CreateService(
        dataSource,
        new UserRepository(),
        new SkillRepository(),
        classSkillListRepository
      );
    });

    test('Deve ser cadastrado o user, skill e skill list', async () => {
      const numberOfExpectedRecords = 3;
      const mockUser = fakeUser(1, numberOfExpectedRecords)[0];

      const createdUser = await service.create(mockUser);
      console.log(createdUser);

      const userRepository = dataSource.getRepository(User);
      const userSearched = await userRepository.findOne({
        where: { id: createdUser.id },
        relations: { skillList: { skill: true } }
      });

      expect(userSearched.skillList).toHaveLength(numberOfExpectedRecords);
      expect(userSearched.createdAt).toBeDefined();
    });

    test('Deve ser cadastrado somente skills que nao existem', async () => {
      const mockUser = fakeUser(1, 5)[0];

      const skill1 = mockUser.skills[0];
      const newSkill1 = new Skill();
      newSkill1.setAttributes(skill1);
      newSkill1.name = skill1.name.toUpperCase();

      const skill2 = mockUser.skills[1];
      const newSkill2 = new Skill();
      newSkill2.setAttributes(skill2);
      newSkill2.name = skill2.name.toUpperCase();

      const skillRepository = dataSource.getRepository(Skill);
      await skillRepository.save([newSkill1, newSkill2]);

      const skillListRepository = dataSource.getRepository(SkillList);

      expect(await skillRepository.find()).toHaveLength(2);
      expect(await skillListRepository.find()).toHaveLength(0);

      await service.create(mockUser);

      expect(await skillRepository.find()).toHaveLength(5);
      expect(await skillListRepository.find()).toHaveLength(5);
    });

    test('Deve ser cadastrado sem level e deve ser gerado um level default', async () => {
      const mockUser = fakeUser()[0];
      delete mockUser.skills;
      delete mockUser.level;

      await service.create(mockUser);

      const userRepository = dataSource.getRepository(User);
      const userCreated = await userRepository.findOne({
        where: { email: mockUser.email }
      });

      expect(userCreated.level).toEqual('Treinee');
    });

    test('Deve ser cadastrado somente user', async () => {
      const mockUser = fakeUser()[0];
      delete mockUser.skills;

      await service.create(mockUser);

      const userRepository = dataSource.getRepository(User);
      const userCreated = await userRepository.findOne({
        where: { email: mockUser.email }
      });

      expect(userCreated).toMatchObject({
        name: mockUser.name,
        email: mockUser.email,
        description: mockUser.description,
        level: mockUser.level
      });
    });

    test('Deve retornar erro ao tentar cadastrar um usuario com email já existente', async () => {
      const mockUser = fakeUser()[0];

      const user = new User();
      user.setAttributes(mockUser);

      const userRepository = dataSource.getRepository(User);
      await userRepository.save(user);

      const create = async () => await service.create(mockUser);

      await expect(create).rejects.toThrowError(ExistingEmailError);
    });

    test('Deve ser lançado um erro e nada deve ser inserido no banco de dados', async () => {
      const mockUser = fakeUser()[0];

      jest.spyOn(classSkillListRepository, 'create').mockImplementation(() => {
        throw new Error('error');
      });

      const create = async () => await service.create(mockUser);

      const userRepository = dataSource.getRepository(User);
      const skillRepository = dataSource.getRepository(Skill);

      expect(await userRepository.find()).toHaveLength(0);
      expect(await skillRepository.find()).toHaveLength(0);

      await expect(create).rejects.toThrowError(Error);

      expect(await userRepository.find()).toHaveLength(0);
      expect(await skillRepository.find()).toHaveLength(0);
    });
  });
});
