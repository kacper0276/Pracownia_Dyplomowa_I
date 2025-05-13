import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { UserInvite } from './user-invite.entity';

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

  @ManyToMany(() => Post, (post) => post.likedBy)
  @JoinTable({
    name: 'user_liked_posts',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'postId', referencedColumnName: 'id' },
  })
  likedPosts: Post[];

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable({
    name: 'user_friends',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'friendId', referencedColumnName: 'id' },
  })
  friends: User[];

  @OneToMany(() => UserInvite, (invite) => invite.sender)
  sentInvites: UserInvite[];

  @OneToMany(() => UserInvite, (invite) => invite.recipient)
  receivedInvites: UserInvite[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
