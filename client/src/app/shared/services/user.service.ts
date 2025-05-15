import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User, UserInvite } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpService) {}

  searchUsers(query: string) {
    return this.http.get<User[]>(`users/search`, {
      params: { query },
    });
  }

  getUserByEmail(email: string) {
    return this.http.get<User>(`users/by-email`, {
      params: { userEmail: email },
    });
  }

  sendInvite(id: number, receiverId: number) {
    return this.http.post<UserInvite>(
      `users/${id}/send-friend-request/${receiverId}`,
      {}
    );
  }

  getInvites(userId: number) {
    return this.http.get<UserInvite[]>(`users/invites/${userId}`);
  }
}
