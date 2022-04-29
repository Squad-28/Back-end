import { DataSource } from 'typeorm';
import UserNotFoundError from '../../errors/UserNotFoundError';
import UserRepository from '../../repositories/UserRepository';
import { TypeUser } from '../../types/TypeUser';
import formatUsersReturn from '../../utils/formatUsersReturn';

class FindByIdService {
  constructor(private userRepository: UserRepository) {}

  public async findById(id: string): Promise<TypeUser> {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) throw new UserNotFoundError();

      return formatUsersReturn([user])[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default FindByIdService;
