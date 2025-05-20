import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment, Post, User } from '../../models';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: Post;

  showComments: boolean = false;
  newComment = '';

  constructor(
    private readonly authService: AuthService,
    private readonly commentService: CommentService,
    private readonly postService: PostService
  ) {}

  onLike() {
    this.postService
      .toggleLike(this.post.id, this.authService.getUserId())
      .subscribe({
        next: (res) => {
          if (res.data) {
            this.post.likes = res.data?.likes;
            this.post.likedBy = res.data.likedBy;
          }
        },
      });
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  isLikedByCurrentUser(): boolean {
    const user = this.authService.getUser();
    return !!this.post.likedBy?.some((u: User) => u.id === user.id);
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
