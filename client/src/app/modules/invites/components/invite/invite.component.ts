import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInvite } from '../../../../shared/models';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'invite',
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss',
})
export class InviteComponent {
  @Input() invite!: UserInvite;
  @Output() onRequestInvite = new EventEmitter<void>();

  constructor(private readonly userService: UserService) {}

  requestInvite(acceptInvite: boolean): void {
    this.userService
      .respondInvite(
        this.invite.sender.id,
        this.invite.receiver.id,
        acceptInvite
      )
      .subscribe({
        next: (res) => {
          console.log(res);

          this.onRequestInvite.emit();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
