import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../shared/services/http.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
})
export class ActivateAccountComponent implements OnInit {
  status: 'pending' | 'success' | 'error' = 'pending';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.userService.activateAccount(email).subscribe({
        next: () => {
          this.status = 'success';
          this.message = 'Konto zostało aktywowane. Możesz się zalogować.';

          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.status = 'error';
          this.message =
            err?.error?.message || 'Wystąpił błąd podczas aktywacji konta.';
        },
      });
    } else {
      this.status = 'error';
      this.message = 'Brak adresu email w linku aktywacyjnym.';
    }
  }
}
