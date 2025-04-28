import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  @Input() isCollapsed = false;

  @Output() toggleNav = new EventEmitter<boolean>();

  toggleNavFunc(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleNav.emit(this.isCollapsed);
  }
}
