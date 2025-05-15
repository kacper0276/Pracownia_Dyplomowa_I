import { Role } from '../enums/role.enum';
import { BaseModel } from './base.model';
import { Post } from './post.model';
import { UserInvite } from './user-invite.model';

export interface User extends BaseModel {
  email: string;
  login: string;
  firstName?: string;
  lastName?: string;
  role: Role;
  profileImage?: string;
  backgroundImage?: string;
  isActive: boolean;
  isOnline: boolean;
  likedPosts: string[];
  friends: User[];
  sentInvites: UserInvite[];
  receivedInvites: UserInvite[];
  posts: Post[];
}
