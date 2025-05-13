import { Component } from '@angular/core';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  chats = [
    {
      id: 1,
      name: 'Grupa Projektowa',
      avatar: 'assets/img/GroupPlaceholder.png',
      lastMessage: 'Cześć, kiedy spotkanie?',
    },
    {
      id: 2,
      name: 'Jan Kowalski',
      avatar: 'assets/img/ProfilePic.jpg',
      lastMessage: 'Hej, jak tam projekt?',
    },
    {
      id: 3,
      name: 'Anna Nowak',
      avatar: 'assets/img/ProfilePic.jpg',
      lastMessage: 'Dzięki za pomoc!',
    },
  ];

  selectedChat: any = null;

  selectChat(chat: any): void {
    this.selectedChat = chat;
  }
}
