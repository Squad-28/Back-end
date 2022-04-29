import UserRepository from '../../repositories/UserRepository';
import { TypeUser } from '../../types/TypeUser';
import formatUsersReturn from '../../utils/formatUsersReturn';

class FindAllService {
  constructor(private userRepository: UserRepository) {}

  public async findAll(limit?: any, offset?: any): Promise<TypeUser[]> {
    limit = parseInt(limit);
    offset = parseInt(offset);

    const anyFieldIsNaN = isNaN(limit) || isNaN(offset);
    if (anyFieldIsNaN) {
      limit = 20;
      offset = 0;
    }

    try {
      const users = await this.userRepository.findAll(limit, offset);

      return formatUsersReturn(users);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

/*
-- usuarios com paginacao

SELECT u.name, u.email, u.level, s.name as skill_name, sl.score 
FROM skill_list sl
JOIN users u ON u.id = sl.userId
JOIN skills s ON s.id = sl.skillId
ORDER BY u.name
LIMIT 20 OFFSET 0;

-- os usuarios que tem a skill 'aws' ordenado por nome

SELECT u.name, u.email, u.level, s.name as skill_name, sl.score 
FROM skill_list sl
JOIN users u ON u.id = sl.userId
JOIN skills s ON s.id = sl.skillId
WHERE s.name = 'aws'
ORDER BY u.name;

depois retorna cada usuario e todos os seus skill

*/

export default FindAllService;
