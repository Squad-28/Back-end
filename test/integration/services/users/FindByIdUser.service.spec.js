import {
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
import Database from '../../../../src/database';
import FindByIdUserService from '../../../../src/services/users/FindByIdUser.service';
import { indexUser } from './__mock__/mockIndexUser';
import { deleteAllRecordsFromTables } from '../../../deleteAllRecordsFromTables';

const database = new Database();
const sequelize = database.getConnection();

describe('services.FindByIdUser', () => {
  afterEach(async () => {
    await deleteAllRecordsFromTables(database.getModels());
  });

  beforeAll(async () => await database.start());
  afterAll(async () => await database.close());

  describe('#findById', () => {
    test('Deve ser retornado o user cadastrado e seus knowledges', async () => {
      const userInstance = new User(indexUser.mockUser);
      await userInstance.save();

      await Knowledge.bulkCreate(indexUser.mockKnowledge);

      await KnowledgeList.bulkCreate(indexUser.mockKnowledgeList);

      const service = new FindByIdUserService(
        null,
        new UserRepository(User, sequelize)
      );

      const userReturned = await service.findById(indexUser.mockUser.id);
      console.log(userReturned);

      const arrayLengthExpected = 3;

      expect(userReturned.knowledges).toHaveLength(arrayLengthExpected);
      expect(userReturned).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          level: expect.any(String),
          description: expect.any(String),
        })
      );
    });
  });
});
