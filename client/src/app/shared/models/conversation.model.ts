import { BaseModel } from './base.model';
import { Message } from './message.model';
import { User } from './user.model';

export interface Conversation extends BaseModel {
  participants: User[];
  messages: Message[];
  groupName: string;
  isGroupChat: boolean;
  isActive: boolean;
  groupImage: string;
}
