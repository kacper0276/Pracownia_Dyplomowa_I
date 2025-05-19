import { Component, OnInit } from '@angular/core';
import { Conversation, User } from '../../../../shared/models';
import { UserService } from '../../../../shared/services/user.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { ConversationService } from '../../../../shared/services/conversation.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  isCreateGroupModalOpen = false;
  chats: Conversation[] = [];
  friends: User[] = [];
  filteredFriends: User[] = [];
  searchFriend = '';
  selectedChat: any = null;
  userId!: number;

  constructor(
    private readonly userService: UserService,
    private readonly conversationService: ConversationService,
    private readonly authService: AuthService
  ) {
    this.userId = this.authService.getUser().id;
  }

  ngOnInit(): void {
    this.loadChats();
    this.loadFriends();
  }

  openCreateGroupModal() {
    this.isCreateGroupModalOpen = true;
  }

  loadChats() {
    this.conversationService.getUserChats(this.userId).subscribe((chats) => {
      this.chats = chats.data ?? [];
    });
  }

  loadFriends() {
    this.userService.getFriends(this.userId).subscribe((friends) => {
      this.friends = friends.data ?? [];
      this.filteredFriends = friends.data ?? [];
    });
  }

  filterFriends() {
    const query = this.searchFriend.toLowerCase();
    this.filteredFriends = this.friends.filter(
      (f) =>
        f.firstName?.toLowerCase().includes(query) ||
        f.lastName?.toLowerCase().includes(query) ||
        f.login.toLowerCase().includes(query)
    );
  }

  startChatWith(friend: any) {
    this.conversationService
      .getOrCreateChat(this.userId, friend.id)
      .subscribe((chat) => {
        this.selectedChat = chat;
        this.loadChats();
      });
  }

  selectChat(chat: any): void {
    this.selectedChat = chat;
  }

  getOtherUser(chat: any) {
    if (!chat.participants) return null;
    return chat.participants.find((u: any) => u.id !== this.userId);
  }
}
