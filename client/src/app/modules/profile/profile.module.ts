import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
