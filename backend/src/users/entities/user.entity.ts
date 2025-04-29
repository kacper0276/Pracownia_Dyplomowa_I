import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  login: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'longtext' })
  profileImage: string;

  @Column({ type: 'longtext' })
  backgroundImage: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isOnline: boolean;

  @Column({ type: 'simple-array', default: '' })
  likedPost: string[];

  @Column({ type: 'simple-array', default: '' })
  friendsId: string[];

  @Column({ type: 'simple-array', default: '' })
  invitedFriends: string[];

  @Column({ type: 'simple-array', default: '' })
  invitedSended: string[];
}
