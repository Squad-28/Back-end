import { jest, describe, test, expect } from '@jest/globals';
import IndexUsersService from '../../../../src/services/users/IndexUsersService';
import {
  mockIndexUsers,
  expectedMockIndexUsers,
} from './__mock__/mockIndexUsers';

describe('services.IndexUsersService', () => {
  describe('#index', () => {
    const mockUsersRepository = {
      index: jest.fn(() => Promise.resolve(mockIndexUsers)),
    };

    test.only('A formatacao dos users com knowledges deve estar correta', async () => {
      const service = new IndexUsersService(null, mockUsersRepository);

      const users = await service.index();

      expect(JSON.stringify(users)).toEqual(expectedMockIndexUsers);
    });
  });
});
