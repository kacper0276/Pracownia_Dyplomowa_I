import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  showModal = false;
  currentUserId = 1;

  toggleShowModal(): void {
    this.showModal = !this.showModal;
  }

  handlePostAdded(post: any): void {
    console.log('New Post:', post);
    this.showModal = false;
  }
}
