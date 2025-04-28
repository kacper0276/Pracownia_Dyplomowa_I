import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowUserSettingsComponent } from './components/show-user-settings/show-user-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ShowUserSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
