import { jest, describe, test, expect } from '@jest/globals';
import IndexUserService from '../../../../src/services/users/IndexUser.service';
import { mockIndexUser, expectedMockIndexUser } from './__mock__/mockIndexUser';

describe('services.IndexUser', () => {
  describe('#index', () => {
    const mockUserRepository = {
      index: jest.fn(() => Promise.resolve(mockIndexUser)),
    };

    test.only('A formatacao dos users com knowledges deve estar correta', async () => {
      const service = new IndexUserService(null, mockUserRepository);

      const users = await service.index();

      expect(JSON.stringify(users)).toEqual(expectedMockIndexUser);
    });
  });
});
