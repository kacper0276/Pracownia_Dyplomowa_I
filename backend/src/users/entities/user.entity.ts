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

  @Column({ type: 'simple-array' })
  likedPost: string[];

  @Column({ type: 'simple-array' })
  friendsId: string[];

  @Column({ type: 'simple-array' })
  invitedFriends: string[];

  @Column({ type: 'simple-array' })
  invitedSended: string[];
}
