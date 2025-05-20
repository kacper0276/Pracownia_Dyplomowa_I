import { BaseModel } from './base.model';
import { User } from './user.model';

export interface Comment extends BaseModel {
  content: string;
  userId: User;
  postId: number;
}
