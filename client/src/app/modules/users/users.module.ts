import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { ShowUsersComponent } from './components/show-users/show-users.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShowUsersComponent, UserItemComponent],
  imports: [SharedModule, UsersRoutingModule, FormsModule, ReactiveFormsModule],
})
export class UsersModule {}
