import UserRepository from '../../repositories/UserRepository';
import { TypeUser } from '../../types/TypeUser';
import formatUsersReturn from '../../utils/formatUsersReturn';

class FindAllService {
  constructor(private userRepository: UserRepository) {}

  public async findAll(limit?: any, offset?: any): Promise<TypeUser[]> {
    limit = parseInt(limit);
    offset = parseInt(offset);

    const anyFieldIsNaN = isNaN(limit) || isNaN(offset);
    const limitIsZeroOrNegative = limit <= 0;
    const offsetIsNegative = offset < 0;
    if (anyFieldIsNaN || limitIsZeroOrNegative || offsetIsNegative) {
      limit = 20;
      offset = 0;
    }

    if (limit > 100) limit = 20;

    try {
      const users = await this.userRepository.findAll(limit, offset);

      return formatUsersReturn(users);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default FindAllService;
