import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../shared/services/http.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
})
export class ActivateAccountComponent implements OnInit {
  status: 'pending' | 'success' | 'error' = 'pending';
  message = '';

  constructor(private route: ActivatedRoute, private http: HttpService) {}

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.http
        .patch<null>(
          `users/activate-account?userEmail=${encodeURIComponent(email)}`,
          {}
        )
        .subscribe({
          next: () => {
            this.status = 'success';
            this.message = 'Konto zostało aktywowane. Możesz się zalogować.';
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
