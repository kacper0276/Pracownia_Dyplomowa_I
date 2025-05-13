import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  @Input() chat: any;

  messages = [
    { sender: 'me', text: 'Test!', time: new Date('2023-05-13T10:00:00') },
    {
      sender: 'Jan Kowalski',
      text: 'dasdsadjadksja kdjaslkd jsadkl asjdlkas jdkl asjdklasjdklas jdsakl jaskld j?',
      time: new Date('2023-05-13T10:01:00'),
    },
    {
      sender: 'me',
      text: 'dasdSDASDASD S',
      time: new Date('2023-05-13T10:02:00'),
    },
  ];

  newMessage = '';

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        sender: 'me',
        text: this.newMessage,
        time: new Date(),
      });
      this.newMessage = '';
    }
  }
}
