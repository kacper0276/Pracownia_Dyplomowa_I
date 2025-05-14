import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/models';
import { SpinnerService } from '../../../../shared/services/spinner.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userData!: User;

  userProfile = {
    email: 'Test@test.pl',
    name: 'TEST',
    surname: 'Testowy',
    bio: 'AAAADASDASDASDKASO D IAS DOASIDJ ASOID',
    isActive: true,
    friends: [
      {
        id: 1,
        name: 'Jan',
        surname: 'Kowalski',
        email: '',
      },
    ],
    posts: [
      {
        id: 1,
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: new Date('2023-10-01'),
      },
      {
        id: 2,
        title: 'Post 2',
        content:
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: new Date('2023-10-02'),
      },
      {
        id: 1,
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: new Date('2023-10-01'),
      },
      {
        id: 2,
        title: 'Post 2',
        content:
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: new Date('2023-10-02'),
      },
    ],
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const email = params['email'];

      this.spinnerService.show();

      this.userService.getUserByEmail(email).subscribe({
        next: (response) => {
          if (response.data) this.userData = response.data;
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        },
        complete: () => {
          this.spinnerService.hide();
        },
      });
    });
  }

  getUserDisplayName(): string {
    return this.userData.firstName
      ? `${this.userData.firstName} ${this.userData.lastName}`
      : this.userData.login;
  }
}
