import {
  Entity,
  Column,
  PrimaryColumn,
  ColumnOptions,
  ManyToOne
} from 'typeorm';
import 'dotenv/config';
import { User } from './User';
import { Skill } from './Skill';

const isTestEnv = process.env.NODE_ENV === 'test';

const scoreType: ColumnOptions = isTestEnv
  ? { width: 1, type: 'int', default: 1 }
  : { width: 1, type: 'int', default: 1, zerofill: true };

@Entity({ name: 'skill_list' })
export class SkillList {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid'
  })
  id?: string;

  @ManyToOne(() => User, (user) => user.skillList, {
    createForeignKeyConstraints: true,
    nullable: false
  })
  user!: User;

  @ManyToOne(() => Skill, (skill) => skill.skillList, {
    createForeignKeyConstraints: true,
    nullable: false
  })
  skill!: Skill;

  @Column(scoreType)
  score?: number;

  public setAttributes(user: User, skill: Skill, score: number): SkillList {
    this.score = score;
    this.skill = skill;
    this.user = user;
    return this;
  }
}
