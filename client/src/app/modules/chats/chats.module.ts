import { NgModule } from '@angular/core';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from '../../shared/shared.module';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatComponent, ChatRoomComponent],
  imports: [SharedModule, ChatsRoutingModule, FormsModule],
})
export class ChatsModule {}
