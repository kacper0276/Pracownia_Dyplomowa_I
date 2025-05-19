import { BaseModel } from './base.model';
import { Conversation } from './conversation.model';
import { User } from './user.model';

export interface Message extends BaseModel {
  conversation: Conversation;
  sender: User;
  senderId: number;
  content: string;
  isRead: boolean;
}
