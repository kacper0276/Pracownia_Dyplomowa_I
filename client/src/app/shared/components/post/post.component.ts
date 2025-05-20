import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment, Post, User } from '../../models';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: Post;
  @Output() like = new EventEmitter<number>();
  @Output() comment = new EventEmitter<number>();

  showComments: boolean = false;
  newComment = '';

  constructor(
    private readonly authService: AuthService,
    private readonly commentService: CommentService
  ) {}

  onLike() {
    this.like.emit(this.post.id);
  }

  onComment() {
    this.comment.emit(this.post.id);
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  isLikedByCurrentUser(): boolean {
    const user = this.authService.getUser();
    return this.post.likedBy?.includes(user.id);
  }

  addComment() {
    if (!this.newComment.trim()) return;

    const user = this.authService.getUser();
    const comment = {
      content: this.newComment,
      userEmail: user.email,
      postId: this.post.id,
    };

    this.commentService.addComment(comment).subscribe({
      next: (res) => {
        if (res.data) this.post.comments = [res.data, ...this.post.comments];
      },
    });

    this.newComment = '';
  }

  getUserDisplayName(user: User): string {
    return user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.login;
  }
}
