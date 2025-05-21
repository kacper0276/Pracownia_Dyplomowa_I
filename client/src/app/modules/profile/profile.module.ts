import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [SharedModule, ProfileRoutingModule, FormsModule],
})
export class ProfileModule {}
