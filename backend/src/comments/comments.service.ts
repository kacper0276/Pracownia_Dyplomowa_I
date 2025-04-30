import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}
}
