import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isNavCollapsed = false;

  toggleNav(collapsed: boolean): void {
    this.isNavCollapsed = collapsed;
  }
}
