import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Comment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private readonly http: HttpService) {}

  addComment(createComment: {
    content: string;
    userEmail: string;
    postId: number;
  }) {
    return this.http.post<Comment>(`comments`, createComment);
  }

  getCommentsForPost(postId: number) {
    return this.http.get<Comment[]>(`comments/post/${postId}`);
  }
}
