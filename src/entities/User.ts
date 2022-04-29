import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { TypeUser } from '../types/TypeUser';
import { SkillList } from './SkillList';

export enum UserLevel {
  TREINEE = 'Treinee',
  JUNIOR = 'Júnior',
  PLENO = 'Pleno',
  SENIOR = 'Sênior'
}

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid'
  })
  id?: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  password!: string;

  @Column({
    type: 'varchar',
    enum: UserLevel,
    default: UserLevel.TREINEE
  })
  level!: UserLevel;

  @Column({
    type: 'text',
    nullable: true
  })
  description?: string;

  @OneToMany(() => SkillList, (skillItem) => skillItem.user, {
    nullable: true
  })
  skillList?: SkillList[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  public setAttributes(user: TypeUser): User {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.level = user?.level;
    this.description = user?.description;
    return this;
  }
}
