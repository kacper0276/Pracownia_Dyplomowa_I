import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../shared/models';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  user: User | null = null;

  @Input() isCollapsed = false;

  @Output() toggleNav = new EventEmitter<boolean>();

  constructor(private readonly authService: AuthService) {
    this.user = this.authService.getUser();
  }

  toggleNavFunc(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleNav.emit(this.isCollapsed);
  }
}
