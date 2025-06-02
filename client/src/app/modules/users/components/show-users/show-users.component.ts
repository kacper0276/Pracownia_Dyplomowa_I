import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/models';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.scss',
})
export class ShowUsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private readonly translate: TranslateService,
    private readonly titleService: Title,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.translate.instant('users-title'));

    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.data ?? [];
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter((u: any) => u.id !== userId);
  }

  updateUser(user: User) {
    console.log(user);
  }
}
