import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Conversation } from '../conversations/entities/conversation.entity';
import { Message } from './entities/message.entity';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessagesGateway.name);

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  handleConnection(_client: Socket) {}

  handleDisconnect(_client: Socket) {}

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, conversationId: string) {
    client.join(conversationId);
    this.logger.log(`Client joined room: ${conversationId}`);

    const conversation = await this.conversationRepository.findOne({
      where: { id: +conversationId },
      relations: ['messages'],
    });

    if (conversation) {
      const sortedMessages = conversation.messages.sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : -1,
      );

      client.emit('loadMessages', sortedMessages);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    payload: {
      roomId: string;
      senderId: number;
      content: string;
    },
  ) {
    try {
      const { roomId, senderId, content } = payload;

      if (!roomId || !senderId || !content) {
        throw new Error('Missing message payload data');
      }

      let conversation = await this.conversationRepository.findOne({
        where: { id: +roomId },
      });

      const sender = await this.userRepository.findOneBy({ id: senderId });

      if (!conversation) {
        conversation = this.conversationRepository.create({ id: +roomId });
        await this.conversationRepository.save(conversation);
      }

      const message = this.messageRepository.create({
        conversation,
        senderId,
        content,
        sender,
      });

      await this.messageRepository.save(message);

      this.server.to(roomId).emit('receiveMessage', {
        id: message.id,
        senderId: message.senderId,
        content: message.content,
        createdAt: message.createdAt,
        sender,
        conversationId: roomId,
      });
    } catch (err) {
      this.logger.error('Error in handleSendMessage:', err);
      client.emit('error', { message: 'Internal server error' });
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveKanbanRoom(client: Socket, roomId: string): void {
    client.leave(roomId);
    this.logger.log(`Client left room: ${roomId}`);
  }
}
