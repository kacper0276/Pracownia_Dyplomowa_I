import { BaseModel } from './base.model';
import { Post } from './post.model';

export interface User extends BaseModel {
  email: string;
  login: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  backgroundImage?: string;
  isActive: boolean;
  isOnline: boolean;
  likedPosts: string[];
  friends: User[];
  sentInvites: string[];
  receivedInvites: string[];
  posts: Post[];
}
