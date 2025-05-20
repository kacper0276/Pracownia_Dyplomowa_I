import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: Post;
  @Output() like = new EventEmitter<number>();
  @Output() comment = new EventEmitter<number>();

  onLike() {
    this.like.emit(this.post.id);
  }

  onComment() {
    this.comment.emit(this.post.id);
  }
}
