import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { UserInvite } from '../../../shared/models';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'invites',
  templateUrl: './invites.component.html',
  styleUrl: './invites.component.scss',
})
export class InvitesComponent implements OnInit {
  userInvites: UserInvite[] = [];
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getInvites(this.authService.getUserId()).subscribe({
      next: (res) => {
        this.userInvites = res.data ?? [];
      },
    });
  }
}
