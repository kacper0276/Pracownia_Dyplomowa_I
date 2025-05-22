import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/models';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { PostService } from '../../../../shared/services/post.service';
import { ToastrService } from 'ngx-toastr';

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
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly toast: ToastrService,
    private readonly router: Router
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
      this.userService
        .updateBio(this.loginUser.email, this.bioDraft)
        .subscribe({
          complete: () => {
            this.editBio = false;
            this.userData.bio = this.bioDraft;
          },
        });
    } else {
      this.editBio = false;
    }
  }

  redirectToFriend(email: string) {
    this.router.navigate(['/profile'], { queryParams: { email } });
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        console.log(this.userData.posts.length);
        this.userData.posts = this.userData.posts.filter(
          (post) => post.id !== postId
        );
        console.log(this.userData.posts.length);
        this.toast.success('Usunięto post');
      },
      error: () => {
        this.toast.error('Błąd');
      },
    });
  }
}
