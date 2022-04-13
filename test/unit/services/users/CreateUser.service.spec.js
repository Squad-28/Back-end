import { jest, describe, test, expect } from '@jest/globals';
import CreateUserService from '../../../../src/services/users/CreateUser.service';
import userFactory from '../../../../src/utils/userFactory';

const existingKnowledges = [
  {
    id: '9683b6e9-e3bb-4fff-b87b-0ab2044d2794',
    name: 'EST',
  },
  {
    id: 'a7ef0962-7cfb-496c-b9a9-9512f6891621',
    name: 'FACERE',
  },
];

const mockKnowledges = [
  {
    name: 'est',
    score: 3,
  },
  {
    name: 'facere',
    score: 5,
  },
  {
    name: 'odit',
    score: 2,
  },
  {
    name: 'quas',
    score: 1,
  },
  {
    name: 'dolores',
    score: 2,
  },
];

const mockUser = userFactory(1, 5)[0];
mockUser.knowledge = mockKnowledges;

describe('services.CreateUser', () => {
  const sequelize = {
    transaction: jest.fn().mockReturnThis(),
    commit: jest.fn().mockResolvedValue({}),
    rollback: jest.fn().mockResolvedValue({}),
  };

  describe('#create', () => {
    const mockUserRepository = {
      create: jest.fn((newUser, transaction) => Promise.resolve(newUser)),
    };

    const mockKnowledgeRepository = {
      findByName: jest.fn().mockResolvedValue(existingKnowledges),
      bulkCreate: jest.fn((knowledges, transaction) =>
        Promise.resolve(knowledges)
      ),
    };

    const mockKnowledgeListRepository = {
      bulkCreate: jest.fn((knowledgesList, transaction) =>
        Promise.resolve(knowledgesList)
      ),
    };

    test('Deve conseguir passar em todas as chamadas e realizar  o commit do transaction', async () => {
      const service = new CreateUserService(
        sequelize,
        mockUserRepository,
        mockKnowledgeRepository,
        mockKnowledgeListRepository
      );

      await service.create(mockUser);

      expect(mockKnowledgeRepository.findByName).toBeCalledTimes(1);
      expect(sequelize.transaction).toBeCalledTimes(1);
      expect(mockUserRepository.create).toBeCalledTimes(1);
      expect(mockKnowledgeRepository.bulkCreate).toBeCalledTimes(1);
      expect(mockKnowledgeListRepository.bulkCreate).toBeCalledTimes(1);
      expect(sequelize.commit).toBeCalledTimes(1);
    });
  });
});
