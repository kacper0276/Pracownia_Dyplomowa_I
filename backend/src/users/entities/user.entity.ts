import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  login: string;

  @Column({ nullable: false })
  password: string;

  // TODO: Add enum for roles

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

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
