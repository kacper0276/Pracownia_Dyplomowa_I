import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../models';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment!: Comment;

  @Output() onRemoveComment = new EventEmitter<number>();

  constructor(private readonly commentService: CommentService) {}

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.onRemoveComment.emit(commentId);
      },
    });
  }
}
