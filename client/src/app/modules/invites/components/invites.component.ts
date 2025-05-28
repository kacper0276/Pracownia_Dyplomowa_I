import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserInvite } from '../../../shared/models';
import { AuthService } from '../../../shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'invites',
  templateUrl: './invites.component.html',
  styleUrl: './invites.component.scss',
})
export class InvitesComponent implements OnInit {
  userInvites: UserInvite[] = [];
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly translate: TranslateService,
    private readonly titleService: Title
  ) {
    this.titleService.setTitle(this.translate.instant('invites-title'));
  }

  ngOnInit(): void {
    this.loadInvites();
  }

  loadInvites(): void {
    this.userService.getInvites(this.authService.getUserId()).subscribe({
      next: (res) => {
        this.userInvites = res.data ?? [];
      },
    });
  }

  removeInvite(inviteId: number): void {
    this.userInvites = this.userInvites.filter(
      (invite) => invite.id !== inviteId
    );
  }
}
