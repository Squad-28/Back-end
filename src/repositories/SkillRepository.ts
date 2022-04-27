import { QueryRunner } from 'typeorm';
import { DatabaseSingleton } from '../database';
import { Skill } from '../entities/Skill';
import { TypeSkill } from '../types/TypeSkill';

class SkillRepository {
  public async findAll(): Promise<Skill[]> {
    try {
      const dataSource = await DatabaseSingleton.getDataSourceInstance();
      const skillRepository = dataSource.getRepository(Skill);
      return await skillRepository.find();
    } catch (error) {
      console.error('[ERRO NO BD, FIND ALL]: ' + error);

      throw error;
    }
  }

  public async findByName(names: string): Promise<any[]> {
    const dataSource = await DatabaseSingleton.getDataSourceInstance();
    try {
      const query = `SELECT id, name FROM skills WHERE name IN (${names});`;
      return await dataSource.query(query);
    } catch (error) {
      console.error('[ERRO NO BD, FIND BY NAME]: ' + error);

      throw error;
    }
  }

  public async create(
    skills: TypeSkill[],
    queryRunner: QueryRunner
  ): Promise<Skill[]> {
    try {
      const skillRepository = queryRunner.manager.getRepository(Skill);
      const skillsSaved = await skillRepository.save(skills);
      return skillsSaved;
    } catch (error) {
      console.error('[ERRO NO BD, CREATE]: ' + error);

      throw error;
    }
  }
}

export default SkillRepository;
