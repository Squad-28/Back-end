import {
  jest,
  describe,
  test,
  expect,
  afterAll,
  beforeAll,
  afterEach,
} from '@jest/globals';
import CreateUsersService from '../../../../src/services/users/CreateUsersService';
import UsersRepository from '../../../../src/repository/Users.repository';
import KnowledgeRepository from '../../../../src/repository/Knowledge.repository';
import KnowledgeListRepository from '../../../../src/repository/KnowledgeList.repository';
import Users from '../../../../src/models/User';
import Knowledge from '../../../../src/models/Knowledge';
import KnowledgeList from '../../../../src/models/KnowledgeList';
import userFactory from '../../../../src/utils/userFactory';
import Database from '../../../../src/database';
import { deleteAllRecordsFromTables } from '../../../deleteAllRecordsFromTables';

const database = new Database();
const sequelize = database.getConnection();

describe('services.CreateUsersService', () => {
  afterEach(async () => {
    // jest.restoreAllMocks();
    await deleteAllRecordsFromTables(database.getModels());
  });

  beforeAll(async () => await database.start());
  afterAll(async () => await database.close());

  describe('#create', () => {
    test('Deve ser cadastrado no banco os registros das tabelas Users, Knowledges e KnowledgeList', async () => {
      const numberOfExpectedRecords = 5;
      const mockUser = userFactory(1, numberOfExpectedRecords)[0];

      // const userRepo = new UsersRepo(Users);
      // await userRepo.create(mockUser);

      const service = new CreateUsersService(
        sequelize,
        new UsersRepository(Users),
        new KnowledgeRepository(Knowledge, sequelize),
        new KnowledgeListRepository(KnowledgeList)
      );

      await service.create(mockUser);

      const query = `
        SELECT 
          u.id, u.name, u.email, u.description, u.level, k.name as knowledge_name, kl.score as knowledge_score
        FROM knowledge_list kl 
        JOIN users u ON kl.id_user = u.id 
        JOIN knowledges k ON kl.id_knowledge = k.id;`;

      const result = await sequelize.query(query);

      expect(result[0]).toHaveLength(numberOfExpectedRecords);
    });
  });
});
