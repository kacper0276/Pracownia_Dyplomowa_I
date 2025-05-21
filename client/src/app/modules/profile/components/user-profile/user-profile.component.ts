import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/models';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userData!: User;
  loginUser!: User;
  sendInviteFlag: boolean = false;
  editBio: boolean = false;
  bioDraft: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly spinnerService: SpinnerService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const email = params['email'];

      this.spinnerService.show();

      this.userService.getUserByEmail(email).subscribe({
        next: (response) => {
          if (response.data) this.userData = response.data;
          this.checkIfInviteIsSend(response.data?.id ?? -1);
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        },
        complete: () => {
          this.spinnerService.hide();
        },
      });
    });

    this.loginUser = this.authService.getUser();
    this.bioDraft = this.userData?.bio || '';
  }

  getUserDisplayName(): string {
    return this.userData.firstName && this.userData.lastName
      ? `${this.userData.firstName} ${this.userData.lastName}`
      : this.userData.login;
  }

  getFriednsName(friendData: User): string {
    return friendData.firstName && friendData.lastName
      ? `${friendData.firstName} ${friendData.lastName}`
      : friendData.login;
  }

  sendInvite(senderId: number, receiverId: number) {
    if (!this.sendInviteFlag) {
      this.userService.sendInvite(senderId, receiverId).subscribe({
        next: (res) => {
          if (res.data) this.loginUser.sentInvites.push(res.data);
          this.sendInviteFlag = true;
        },
        error: () => {},
      });
    }
  }

  checkIfInviteIsSend(receiverId: number) {
    const filter = this.loginUser.sentInvites.filter(
      (el) =>
        el.receiver.id === receiverId && el.sender.id === this.loginUser.id
    );

    if (filter.length) {
      this.sendInviteFlag = true;
    }
  }

  isFriend(): boolean {
    return this.loginUser.friends?.some((f: User) => f.id === this.userData.id);
  }

  saveBio() {
    if (this.editBio && this.bioDraft !== this.userData.bio) {
      console.log(this.bioDraft);
    } else {
      this.editBio = false;
    }
  }
}
