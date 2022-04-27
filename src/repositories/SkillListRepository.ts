import { QueryRunner } from 'typeorm';
import { SkillList } from '../entities/SkillList';

class SkillListRepository {
  public async create(
    skillList: SkillList[],
    queryRunner: QueryRunner
  ): Promise<SkillList[]> {
    try {
      const skillListRepository = queryRunner.manager.getRepository(SkillList);

      return await skillListRepository.save(skillList);
    } catch (error) {
      console.log('[ERRO NO BD, CREATE]: ' + error);

      throw error;
    }
  }
}

export default SkillListRepository;
