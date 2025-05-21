import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WebSocketService } from '../../../../shared/services/web-socker.service';
import { Conversation, Message, User } from '../../../../shared/models';
import { AuthService } from '../../../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @ViewChild('messagesContainer')
  messagesContainer!: ElementRef<HTMLDivElement>;
  @Input() chat!: Conversation;
  messages: Message[] = [];
  newMessage = '';
  userId!: number;
  private conversationId!: string;
  private routerSub?: Subscription;
  private messagesSub?: Subscription;
  private onMessageSub?: Subscription;

  constructor(
    private readonly wsService: WebSocketService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.conversationId = this.chat.id.toString();
    this.wsService.joinRoom(this.conversationId);

    this.messagesSub = this.wsService.loadMessages().subscribe((msgs) => {
      this.messages = msgs;
      this.scrollToBottom();
    });

    this.onMessageSub = this.wsService.onMessage().subscribe((msg) => {
      if (msg.conversationId === this.conversationId) {
        this.messages.push(msg);
        this.scrollToBottom();
      }
    });

    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.wsService.leaveRoom(this.conversationId);
      }
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnChanges() {
    if (this.conversationId) {
      this.wsService.leaveRoom(this.conversationId);
    }
    if (this.chat) {
      this.conversationId = this.chat.id.toString();
      this.wsService.joinRoom(this.conversationId);

      this.wsService.loadMessages().subscribe((msgs) => {
        this.messages = msgs;
        this.scrollToBottom();
      });
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.wsService.sendMessage(
        this.conversationId,
        this.newMessage,
        this.authService.getUser()
      );
      this.newMessage = '';
      this.scrollToBottom();
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
    this.routerSub?.unsubscribe();
    this.messagesSub?.unsubscribe();
    this.onMessageSub?.unsubscribe();
  }
}
