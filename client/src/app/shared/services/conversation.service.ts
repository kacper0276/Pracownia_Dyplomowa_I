import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Conversation } from '../models';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  constructor(private http: HttpService) {}

  getUserChats(userId: number) {
    return this.http.get<Conversation[]>(`conversations/user/${userId}`);
  }

  getOrCreateChat(userId: number, friendId: number) {
    return this.http.post<Conversation>(`conversations/get-or-create`, {
      userId,
      friendId,
    });
  }

  createConversation(payload: any, userIds: number[]) {
    return this.http.post<Conversation>('conversations', payload, {
      params: { userIds: userIds.join(',') },
    });
  }
}
