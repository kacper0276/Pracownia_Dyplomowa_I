import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from '../../../../shared/services/web-socker.service';
import { Conversation, Message, User } from '../../../../shared/models';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @Input() chat!: Conversation;
  messages: Message[] = [];
  newMessage = '';
  userId!: number;
  private conversationId!: string;

  constructor(
    private readonly wsService: WebSocketService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.conversationId = this.chat.id.toString();
    this.wsService.joinRoom(this.conversationId);

    this.wsService.loadMessages().subscribe((msgs) => {
      this.messages = msgs;
    });

    this.wsService.onMessage().subscribe((msg) => {
      if (msg.conversationId === this.conversationId) {
        this.messages.push(msg);
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.wsService.sendMessage(
        this.conversationId,
        this.newMessage,
        this.authService.getUser()
      );
      this.newMessage = '';
    }
  }

  getOtherUser(chat: Conversation) {
    if (!chat.participants) return null;
    return chat.participants.find(
      (u: User) => u.id !== this.authService.getUser().id
    );
  }

  ngOnDestroy(): void {
    this.wsService.leaveRoom(this.conversationId);
  }
}
