import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
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
}
