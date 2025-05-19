import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Response } from 'express';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
    @Query('userIds') userIds: string,
    @Res() response: Response,
  ) {
    try {
      const ids = userIds.split(',').map((id) => Number(id));
      const conversation = await this.conversationsService.create(
        createConversationDto,
        ids,
      );
      response.status(HttpStatus.CREATED).send({
        message: 'conversation-created',
        data: conversation,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).send({
        message: error.message || 'conversation-create-error',
      });
    }
  }

  @Get('user/:userId')
  async getUserConversations(
    @Param('userId') userId: number,
    @Res() response: Response,
  ) {
    try {
      const conversations = await this.conversationsService.findByUser(userId);
      response.status(HttpStatus.OK).send({
        message: 'conversations-found',
        data: conversations,
      });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: error.message || 'conversations-fetch-error',
      });
    }
  }

  @Post('get-or-create')
  async getOrCreateConversation(
    @Body() body: { userId: number; friendId: number },
    @Res() response: Response,
  ) {
    try {
      const conversation = await this.conversationsService.getOrCreateOneToOne(
        body.userId,
        body.friendId,
      );
      response.status(HttpStatus.OK).send({
        message: 'conversation-found-or-created',
        data: conversation,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).send({
        message: error.message || 'conversation-get-or-create-error',
      });
    }
  }
}
