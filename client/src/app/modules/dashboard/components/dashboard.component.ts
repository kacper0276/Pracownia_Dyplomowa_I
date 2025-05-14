import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  showModal = false;
  searchControl = new FormControl('');
  users: User[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => this.userService.searchUsers(query ?? ''))
      )
      .subscribe((users) => {
        this.users = users.data ?? [];
      });
  }

  goToUserProfile(email: string): void {
    this.router.navigate(['/profile'], { queryParams: { email } });
  }

  getProfileImage(user: User): string {
    return user.profileImage
      ? user.profileImage
      : '../../../../assets/img/ProfilePic.jpg';
  }

  toggleShowModal(): void {
    this.showModal = !this.showModal;
  }

  handlePostAdded(post: any): void {
    console.log('New Post:', post);
    this.showModal = false;
  }
}
