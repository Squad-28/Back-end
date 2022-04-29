import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { TypeSkill } from '../types/TypeSkill';
import { SkillList } from './SkillList';

@Entity({ name: 'skills' })
export class Skill {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid'
  })
  id?: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true
  })
  name!: string;

  @OneToMany(() => SkillList, (skillItem) => skillItem.skill, {
    nullable: true
  })
  skillList?: SkillList[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  public setAttributes(skill: TypeSkill): Skill {
    this.name = skill.name;
    return this;
  }
}
