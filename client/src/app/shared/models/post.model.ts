import { BaseModel } from './base.model';
import { Comment } from './comment.model';
import { User } from './user.model';

export interface Post extends BaseModel {
  name: string;
  description: string;
  image?: string;
  likes: number;
  userId: number;
  comments: Comment[];
  likedBy: User[];
}
