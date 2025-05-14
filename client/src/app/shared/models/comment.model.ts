import { BaseModel } from './base.model';

export interface Comment extends BaseModel {
  content: string;
  userId: number;
  postId: number;
}
