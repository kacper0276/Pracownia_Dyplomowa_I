import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Post } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpService) {}

  getFriendsPosts(userId: number, page: number, limit: number) {
    return this.http.get<Post[]>(
      `posts/friends/${userId}?page=${page}&limit=${limit}`
    );
  }
}
