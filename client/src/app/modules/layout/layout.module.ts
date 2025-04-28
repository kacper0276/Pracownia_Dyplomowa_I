import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LayoutComponent, FooterComponent, SideNavComponent],
  imports: [SharedModule, LayoutRoutingModule],
})
export class LayoutModule {}
