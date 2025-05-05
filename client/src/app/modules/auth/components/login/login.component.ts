import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { HttpService } from '../../../../shared/services/http.service';
import { ApiResponse, LoginResponseData } from '../../../../shared/models';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.httpService
        .post<ApiResponse<LoginResponseData>>('auth/login', loginData)
        .subscribe({
          next: (response) => {
            console.log('Zalogowano pomyślnie:', response.message);

            if (response.data) {
              const { accessToken, refreshToken, user } = response.data;
              this.authService.setLoginData(accessToken, refreshToken, user);
            }

            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Błąd logowania:', error);
            alert('Nieprawidłowe dane logowania.');
          },
        });
    }
  }
}
