import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

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
    private userService: UserService,
    private titleService: Title,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(
      this.translate.instant('activate-account-title')
    );

    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.userService.activateAccount(email).subscribe({
        next: () => {
          this.status = 'success';
          this.message = 'account-activated-successfully';

          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.status = 'error';
          this.message = 'an-error-occurred-while-registering-your-account';
        },
      });
    } else {
      this.status = 'error';
      this.message = 'invalid-activation-link';
    }
  }
}
