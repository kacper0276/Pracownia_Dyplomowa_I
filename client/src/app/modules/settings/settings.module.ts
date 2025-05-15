import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { ShowUserSettingsComponent } from './components/show-user-settings/show-user-settings.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShowUserSettingsComponent],
  imports: [SharedModule, SettingsRoutingModule, ReactiveFormsModule],
})
export class SettingsModule {}
