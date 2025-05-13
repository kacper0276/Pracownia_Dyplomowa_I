import { NgModule } from '@angular/core';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ChatComponent],
  imports: [SharedModule, ChatsRoutingModule],
})
export class ChatsModule {}
