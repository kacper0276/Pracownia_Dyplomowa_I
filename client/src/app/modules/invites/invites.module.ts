import { NgModule } from '@angular/core';

import { InvitesRoutingModule } from './invites-routing.module';
import { InvitesComponent } from './components/invites.component';
import { InviteComponent } from './components/invite/invite.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [InvitesComponent, InviteComponent],
  imports: [SharedModule, InvitesRoutingModule],
})
export class InvitesModule {}
