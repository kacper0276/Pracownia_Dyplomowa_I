import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ShowUserSettingsComponent } from './components/show-user-settings/show-user-settings.component';


@NgModule({
  declarations: [
    ShowUserSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
