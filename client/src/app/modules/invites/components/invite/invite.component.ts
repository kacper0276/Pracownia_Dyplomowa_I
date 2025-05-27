import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInvite } from '../../../../shared/models';
import { UserService } from '../../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'invite',
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss',
})
export class InviteComponent {
  @Input() invite!: UserInvite;
  @Output() onRequestInvite = new EventEmitter<void>();

  constructor(
    private readonly userService: UserService,
    private readonly toast: ToastrService,
    private readonly translate: TranslateService
  ) {}

  requestInvite(acceptInvite: boolean): void {
    this.userService
      .respondInvite(
        this.invite.sender.id,
        this.invite.receiver.id,
        acceptInvite
      )
      .subscribe({
        next: () => {
          this.toast.success(this.translate.instant('invitation-sent'));
          this.onRequestInvite.emit();
        },
        error: () => {
          this.toast.error(this.translate.instant('error-sending-invitation'));
        },
      });
  }
}
