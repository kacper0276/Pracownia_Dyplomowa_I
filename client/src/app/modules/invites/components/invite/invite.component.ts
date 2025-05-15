import { Component, Input } from '@angular/core';
import { UserInvite } from '../../../../shared/models';

@Component({
  selector: 'invite',
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss',
})
export class InviteComponent {
  @Input() invite!: UserInvite;

  acceptInvite(): void {}

  declineInvite(): void {}
}
