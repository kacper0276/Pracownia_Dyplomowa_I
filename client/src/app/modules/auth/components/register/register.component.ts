import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse, LoginResponseData } from '../../../../shared/models';
import { AuthService } from '../../../../shared/services/auth.service';
import { HttpService } from '../../../../shared/services/http.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showRepeatedPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeated_password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatedPasswordVisibility(): void {
    this.showRepeatedPassword = !this.showRepeatedPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const loginData = this.registerForm.value;

      if (loginData.password !== loginData.repeated_password) {
        alert('Hasła nie są takie same!');
        return;
      }

      this.httpService
        .post<ApiResponse<LoginResponseData>>('user/register', loginData)
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
