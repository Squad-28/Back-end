import 'dotenv/config';
import { DataSourceOptions, LoggerOptions } from 'typeorm';

import { User } from '../entities/User';
import { Skill } from '../entities/Skill';
import { SkillList } from '../entities/SkillList';

const entities: any[] = [User, Skill, SkillList];
const logging: LoggerOptions = ['log', 'error', 'schema', 'warn'];

const developmentConfig: DataSourceOptions = {
  type: process.env.DB_DIALECT as any,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities,
  logging
};

const testConfig: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities,
  logging: [...logging]
};

const productionConfig: DataSourceOptions = {
  type: process.env.DB_DIALECT as any,
  url: process.env.CLEARDB_DATABASE_URL,
  entities,
  logging
};

const NODE_ENV = process.env.NODE_ENV;

let config: DataSourceOptions;

if (NODE_ENV === 'production') {
  config = productionConfig;
} else if (NODE_ENV === 'test') {
  config = testConfig;
} else {
  config = developmentConfig;
}

export default config;
