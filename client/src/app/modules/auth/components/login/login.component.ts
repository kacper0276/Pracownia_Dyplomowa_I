import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { HttpService } from '../../../../shared/services/http.service';
import { ApiResponse, LoginResponseData } from '../../../../shared/models';
import { WebSocketService } from '../../../../shared/services/web-socker.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    private readonly webSocketService: WebSocketService,
    private readonly toast: ToastrService,
    private readonly translate: TranslateService,
    private readonly titleService: Title
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.titleService.setTitle(this.translate.instant('login-title'));
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.httpService
        .post<LoginResponseData>('auth/login', loginData)
        .subscribe({
          next: (response) => {
            if (response.data) {
              const { accessToken, refreshToken, user } = response.data;
              this.authService.setLoginData(accessToken, refreshToken, user);
              this.webSocketService.connect(user.id.toString());
            }

            this.router.navigate(['/']);
          },
          error: () => {
            this.toast.error(this.translate.instant('incorrect-login-details'));
          },
        });
    }
  }
}
