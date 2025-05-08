import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  showModal = false;
  searchControl = new FormControl('');
  users: any[] = [];

  constructor(private readonly userService: UserService) {}

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

  toggleShowModal(): void {
    this.showModal = !this.showModal;
  }

  handlePostAdded(post: any): void {
    console.log('New Post:', post);
    this.showModal = false;
  }
}
