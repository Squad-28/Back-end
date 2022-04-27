import { DataSource } from 'typeorm';
import { User } from '../../entities/User';
import UserRepository from '../../repositories/UserRepository';
import { TypeUser } from '../../types/TypeUser';
import formatUsersReturn from '../../utils/formatUsersReturn';

class FindAllService {
  constructor(private userRepository: UserRepository) {}

  public async findAll(): Promise<TypeUser[]> {
    try {
      const users = await this.userRepository.findAll();

      return formatUsersReturn(users);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default FindAllService;
