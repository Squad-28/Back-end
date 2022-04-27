import config from '../config/database';

import { DataSource } from 'typeorm';

export class DatabaseSingleton {
  private static dataSource: DataSource;

  private constructor() {}

  public static async getDataSourceInstance(): Promise<DataSource> {
    if (!DatabaseSingleton.dataSource?.isInitialized) {
      return await DatabaseSingleton.connect();
    }
    return DatabaseSingleton.dataSource;
  }

  public static async close(): Promise<void> {
    if (DatabaseSingleton.dataSource?.isInitialized) {
      await DatabaseSingleton.dataSource.destroy();
    }
  }

  public static async connect(): Promise<DataSource> {
    if (DatabaseSingleton.dataSource?.isInitialized) {
      return DatabaseSingleton.dataSource;
    }

    const dataSourceCreated = new DataSource(config);

    try {
      DatabaseSingleton.dataSource = await dataSourceCreated.initialize();

      console.log('📦 Connection has been established successfully.');
      return DatabaseSingleton.dataSource;
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);

      throw error;
    }
  }
}
