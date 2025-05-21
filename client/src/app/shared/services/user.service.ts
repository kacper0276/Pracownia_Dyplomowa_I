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

  sendInvite(senderId: number, receiverId: number) {
    return this.http.post<UserInvite>(
      `users/${senderId}/send-friend-request/${receiverId}`,
      {}
    );
  }

  updateUserData(userId: number, data: Partial<User>) {
    return this.http.patch<User>(`users/${userId}`, data);
  }

  getInvites(userId: number) {
    return this.http.get<UserInvite[]>(`users/invites/${userId}`);
  }

  respondInvite(senderId: number, receiverId: number, accept: boolean) {
    return this.http.patch<null>(
      `users/${receiverId}/respond-friend-request/${senderId}`,
      { accept }
    );
  }

  getFriends(userId: number) {
    return this.http.get<User[]>(`users/${userId}/friends`);
  }

  activateAccount(email: string) {
    return this.http.put<null>(
      `users/activate-account`,
      {},
      {
        params: { userEmail: email },
      }
    );
  }

  updateBio(email: string, bio: string) {
    return this.http.patch<null>('users/edit-bio', { email, bio });
  }
}
