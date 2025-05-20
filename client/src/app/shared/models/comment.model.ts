import { BaseModel } from './base.model';
import { User } from './user.model';

export interface Comment extends BaseModel {
  content: string;
  user: User;
  postId: number;
}
