import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;
}
