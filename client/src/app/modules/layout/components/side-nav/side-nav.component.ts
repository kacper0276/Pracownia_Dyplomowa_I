import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../shared/models';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  user: User | null = null;

  @Input() isCollapsed = false;

  @Output() toggleNav = new EventEmitter<boolean>();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {
    this.user = this.authService.getUser();
  }

  toggleNavFunc(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleNav.emit(this.isCollapsed);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
