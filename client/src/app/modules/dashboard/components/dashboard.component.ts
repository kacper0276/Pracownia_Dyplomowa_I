import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { Post, User } from '../../../shared/models';
import { AuthService } from '../../../shared/services/auth.service';
import { PostService } from '../../../shared/services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  showModal = false;
  searchControl = new FormControl('');
  users: User[] = [];
  posts: Post[] = [];
  page = 1;
  limit = 1000;
  loading = false;
  allLoaded = false;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly postService: PostService,
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

    this.loadPosts();
  }

  loadPosts(): void {
    if (this.loading || this.allLoaded) return;
    this.loading = true;
    const userId = this.authService.getUserId();
    this.postService.getFriendsPosts(userId, this.page, this.limit).subscribe({
      next: (res) => {
        const newPosts = res?.data || [];
        if (newPosts.length < this.limit) this.allLoaded = true;
        this.posts = [...this.posts, ...newPosts];
        this.page++;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  onScroll(): void {
    this.loadPosts();
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
    this.showModal = false;
  }

  onLike(postId: number) {}

  onComment(postId: number) {}

  onPostsListScroll(event: Event) {
    if (this.loading || this.allLoaded) return;
    const target = event.target as HTMLElement;
    const threshold = 150;

    if (
      target.scrollHeight - target.scrollTop - target.clientHeight <
      threshold
    ) {
      this.loadPosts();
    }
  }
}
