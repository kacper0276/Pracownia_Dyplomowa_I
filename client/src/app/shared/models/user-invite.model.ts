import { InviteStatus } from '../enums/invite-status.enum';
import { BaseModel } from './base.model';
import { User } from './user.model';

export interface UserInvite extends BaseModel {
  receiver: User;
  sender: User;
  status: InviteStatus;
  message?: string;
}
