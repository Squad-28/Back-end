import { User } from '../entities/User';
import { TypeUser } from '../types/TypeUser';

export default function formatUsersReturn(users: User[]): TypeUser[] {
  let skills;
  return users.map((user) => {
    delete user.createdAt;
    delete user.updatedAt;
    delete user.password;

    if (!user.description) {
      delete user.description;
    }

    const fieldExist = !!user?.skillList;
    if (!fieldExist) return user;

    const fieldIsEmpty = user?.skillList?.length <= 0;
    if (fieldIsEmpty) {
      delete user.skillList;
      return user;
    }

    skills = user.skillList.map((skillList) => ({
      name: skillList.skill.name,
      score: skillList.score
    }));

    delete user.skillList;

    return {
      ...user,
      skills
    };
  });
}
function arrayIsEmpty(array: any = []): Boolean {
  return array?.length <= 0;
}
