import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
    @Query('userIds') userIds: string,
  ) {
    const ids = userIds.split(',').map((id) => Number(id));
    return this.conversationsService.create(createConversationDto, ids);
  }

  @Get('user/:userId')
  async getUserConversations(@Param('userId') userId: number) {
    return this.conversationsService.findByUser(userId);
  }

  @Post('get-or-create')
  async getOrCreateConversation(
    @Body() body: { userId: number; friendId: number },
  ) {
    return this.conversationsService.getOrCreateOneToOne(
      body.userId,
      body.friendId,
    );
  }
}
