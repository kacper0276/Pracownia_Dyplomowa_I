import { InviteStatus } from '../enums/invite-status.enum';
import { User } from './user.model';

export interface UserInvite {
  id: number;
  recipientId: number;
  senderId: number;
  status: InviteStatus;
  message?: string;
  recipient?: User;
  sender?: User;
}
