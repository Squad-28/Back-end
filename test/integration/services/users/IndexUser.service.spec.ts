import {
  jest,
  describe,
  test,
  expect,
  afterAll,
  beforeAll,
  afterEach,
} from '@jest/globals';
import UserRepository from '../../../../src/repositories/User.repository';
import User from '../../../../src/models/User';
import Knowledge from '../../../../src/models/Knowledge';
import KnowledgeList from '../../../../src/models/KnowledgeList';
import userFactory from '../../../../src/utils/userFactory';
import Database from '../../../../src/database';
import IndexUserService from '../../../../src/services/users/IndexUser.service';
import { indexUser } from './__mock__/mockIndexUser';
import { deleteAllRecordsFromTables } from '../../../deleteAllRecordsFromTables';

const database = new Database();
const sequelize = database.getConnection();

describe('services.IndexUser', () => {
  afterEach(async () => {
    await deleteAllRecordsFromTables(database.getModels());
  });

  beforeAll(async () => await database.start());
  afterAll(async () => await database.close());

  describe('#index', () => {
    test('Deve ser retornado os registros formatados das tabelas Users, Knowledges e KnowledgeList', async () => {
      const userInstance = new User(indexUser.mockUser);
      await userInstance.save();

      await Knowledge.bulkCreate(indexUser.mockKnowledge);

      await KnowledgeList.bulkCreate(indexUser.mockKnowledgeList);

      const service = new IndexUserService(
        null,
        new UserRepository(User, sequelize)
      );

      const result = await service.index();

      const knowledges = result[0].knowledges;
      const arrayLengthExpected = 3;

      delete result[0].knowledges;

      const userReturned = result[0];

      const userExpected = {
        id: '5e42d8aa-c98a-4886-8253-935ed3b26950',
        name: 'Dra. Ígor Braga',
        email: 'Mrcia93@yahoo.com',
        level: 'rerum',
        description: 'quae aliquid veniam',
      };

      expect(knowledges).toHaveLength(arrayLengthExpected);
      expect(userReturned).toEqual(userExpected);
    });
  });
});
