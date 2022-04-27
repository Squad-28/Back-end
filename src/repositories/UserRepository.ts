import { User } from '../entities/User';
import { DataSource, QueryRunner } from 'typeorm';
import { DatabaseSingleton } from '../database';

class UserRepository {
  private async getDataSource(): Promise<DataSource> {
    return await DatabaseSingleton.getDataSourceInstance();
  }

  async findAll(): Promise<User[]> {
    const dataSource = await this.getDataSource();
    const userRepository = await dataSource.getRepository(User);

    try {
      return await userRepository.find({
        relations: { skillList: { skill: true } }
      });
    } catch (error) {
      console.error('[ERRO NO BD, FIND ALL]: ' + error);

      throw error;
    }
  }

  async create(user: User, queryRunner: QueryRunner): Promise<User> {
    const userRepository = queryRunner.manager.getRepository(User);
    try {
      const userSaved = await userRepository.save(user);

      return userSaved;
    } catch (error) {
      console.error('[ERRO NO BD, CREATE]: ' + error);

      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    const dataSource = await this.getDataSource();
    const userRepository = dataSource.getRepository(User);
    try {
      const user = await userRepository.findOne({
        relations: { skillList: { skill: true } },
        where: { id }
      });

      return user;
    } catch (error) {
      console.error('[ERRO NO BD, FIND BY ID]: ' + error);

      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    const dataSource = await this.getDataSource();
    const userRepository = dataSource.getRepository(User);
    try {
      const user = await userRepository.findOne({
        where: { email }
      });

      return user;
    } catch (error) {
      console.error('[ERRO NO BD, FIND BY EMAIL]: ' + error);

      throw error;
    }
  }
}

export default UserRepository;
