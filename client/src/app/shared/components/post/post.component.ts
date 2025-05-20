import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment, Post } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: Post;
  @Output() like = new EventEmitter<number>();
  @Output() comment = new EventEmitter<number>();

  constructor(private readonly authService: AuthService) {}

  onLike() {
    this.like.emit(this.post.id);
  }

  onComment() {
    this.comment.emit(this.post.id);
  }

  newComment = '';

  addComment() {
    if (!this.newComment.trim()) return;

    const user = this.authService.getUser();

    // this.post.comments = [comment, ...this.post.comments];
    this.newComment = '';
  }
}
