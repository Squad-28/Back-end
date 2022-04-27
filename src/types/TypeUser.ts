import { UserLevel } from '../entities/User';
import { TypeSkill } from './TypeSkill';

export type TypeUser = {
  id?: string;
  name: string;
  email: string;
  password?: string;
  level?: UserLevel;
  description?: string;
  skills?: TypeSkill[];
  createdAt?: Date;
  updatedAt?: Date;
};
