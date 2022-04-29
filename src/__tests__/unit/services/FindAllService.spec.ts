import { User } from '../../../entities/User';
import UserRepository from '../../../repositories/UserRepository';
import FindAllService from '../../../services/users/FindAllService';
import { fakeUser } from '../../generateMock';

describe('FindAllService', () => {
  describe('#findAll', () => {
    afterEach(() => jest.resetAllMocks());

    test('Limit e offset devem ser undefined', async () => {
      const user = new User().setAttributes(fakeUser()[0]);

      const userRepository = new UserRepository();
      jest.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue([user]);

      const findAllService = new FindAllService(userRepository);
      await findAllService.findAll(undefined, undefined);

      expect(UserRepository.prototype.findAll).toBeCalledWith(20, 0);
    });

    test('Limit deve ser 0 e offset 0', async () => {
      const user = new User().setAttributes(fakeUser()[0]);

      const userRepository = new UserRepository();
      jest.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue([user]);

      const findAllService = new FindAllService(userRepository);
      await findAllService.findAll(0, 0);

      expect(UserRepository.prototype.findAll).toBeCalledWith(20, 0);
    });

    test('Limit deve ser maior que 100', async () => {
      const user = new User().setAttributes(fakeUser()[0]);

      const userRepository = new UserRepository();
      jest.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue([user]);

      const findAllService = new FindAllService(userRepository);
      await findAllService.findAll(101, 0);

      expect(UserRepository.prototype.findAll).toBeCalledWith(20, 0);
    });

    test('Limit e offset devem ser negativo', async () => {
      const user = new User().setAttributes(fakeUser()[0]);

      const userRepository = new UserRepository();
      jest.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue([user]);

      const findAllService = new FindAllService(userRepository);
      await findAllService.findAll(-1, -30);

      expect(UserRepository.prototype.findAll).toBeCalledWith(20, 0);
    });

    test('Offset deve ser negativo', async () => {
      const user = new User().setAttributes(fakeUser()[0]);

      const userRepository = new UserRepository();
      jest.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue([user]);

      const findAllService = new FindAllService(userRepository);
      await findAllService.findAll(undefined, 2);

      expect(UserRepository.prototype.findAll).toBeCalledWith(20, 0);
    });

    test('Limit deve ser undefined e offset inteiro', async () => {
      const user = new User().setAttributes(fakeUser()[0]);

      const userRepository = new UserRepository();
      jest.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue([user]);

      const findAllService = new FindAllService(userRepository);
      await findAllService.findAll(undefined, 2);

      expect(UserRepository.prototype.findAll).toBeCalledWith(20, 0);
    });

    test('Limit e offset nao devem ser declarados', async () => {
      const user = new User().setAttributes(fakeUser()[0]);

      const userRepository = new UserRepository();
      jest.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue([user]);

      const findAllService = new FindAllService(userRepository);
      await findAllService.findAll();

      expect(UserRepository.prototype.findAll).toBeCalledWith(20, 0);
    });

    test('Limit e offset devem ser numeros em string', async () => {
      const user = new User().setAttributes(fakeUser()[0]);

      const userRepository = new UserRepository();
      jest.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue([user]);

      const findAllService = new FindAllService(userRepository);
      await findAllService.findAll('3', '2');

      expect(UserRepository.prototype.findAll).toBeCalledWith(3, 2);
    });

    test('Limit deve ser float e offset inteiro', async () => {
      const user = new User().setAttributes(fakeUser()[0]);

      const userRepository = new UserRepository();
      jest.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue([user]);

      const findAllService = new FindAllService(userRepository);
      await findAllService.findAll(3.9, '2');

      expect(UserRepository.prototype.findAll).toBeCalledWith(3, 2);
    });
  });
});
