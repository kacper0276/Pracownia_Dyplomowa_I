import { NgModule } from '@angular/core';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from '../../shared/shared.module';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateGroupModalComponent } from './components/create-group-modal/create-group-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [ChatComponent, ChatRoomComponent, CreateGroupModalComponent],
  imports: [
    SharedModule,
    ChatsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class ChatsModule {}
