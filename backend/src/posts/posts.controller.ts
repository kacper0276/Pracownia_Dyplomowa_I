import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Response } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(@Res() response: Response) {
    try {
      const posts = await this.postsService.findAll();
      response.status(HttpStatus.OK).send({
        message: 'posts-retrieved',
        data: posts,
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'internal-server-error',
      });
    }
  }

  @Get(':id')
  async getPostById(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    try {
      const post = await this.postsService.findOne(id);
      response.status(HttpStatus.OK).send({
        message: 'post-retrieved',
        data: post,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        response.status(HttpStatus.NOT_FOUND).send({
          message: error.message,
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: 'internal-server-error',
        });
      }
    }
  }

  @Get('user/:userId')
  async getPostsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() response: Response,
  ) {
    try {
      const posts = await this.postsService.findByUserId(userId);
      response.status(HttpStatus.OK).send({
        message: 'posts-retrieved',
        data: posts,
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'internal-server-error',
      });
    }
  }

  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Res() response: Response,
  ) {
    try {
      const post = await this.postsService.create(createPostDto);
      response.status(HttpStatus.CREATED).send({
        message: 'post-created',
        data: post,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        response.status(HttpStatus.BAD_REQUEST).send({
          message: error.message,
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: 'internal-server-error',
        });
      }
    }
  }

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Res() response: Response,
  ) {
    try {
      const post = await this.postsService.update(id, updatePostDto);
      response.status(HttpStatus.OK).send({
        message: 'post-updated',
        data: post,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        response.status(HttpStatus.NOT_FOUND).send({
          message: error.message,
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: 'internal-server-error',
        });
      }
    }
  }

  @Delete(':id')
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    try {
      await this.postsService.delete(id);
      response.status(HttpStatus.OK).send({
        message: 'post-deleted',
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        response.status(HttpStatus.NOT_FOUND).send({
          message: error.message,
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: 'internal-server-error',
        });
      }
    }
  }
}
