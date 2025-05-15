import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitesComponent } from './components/invites.component';

const routes: Routes = [{ path: '', component: InvitesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitesRoutingModule {}
