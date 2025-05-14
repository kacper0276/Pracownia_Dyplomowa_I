import { InviteStatus } from '../enums/invite-status.enum';
import { BaseModel } from './base.model';
import { User } from './user.model';

export interface UserInvite extends BaseModel {
  recipientId: number;
  senderId: number;
  status: InviteStatus;
  message?: string;
  recipient?: User;
  sender?: User;
}
