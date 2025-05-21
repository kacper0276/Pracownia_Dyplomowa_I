import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse, LoginResponseData } from '../../../../shared/models';
import { HttpService } from '../../../../shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

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
    private httpService: HttpService,
    private toast: ToastrService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required],
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
      const registerData = this.registerForm.value;

      if (registerData.password !== registerData.repeatedPassword) {
        this.toast.error('Hasła nie są takie same!');
        return;
      }

      this.httpService
        .post<ApiResponse<LoginResponseData>>('users/register', registerData)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            console.error('Błąd rejestracji:', error);
            this.toast.error('Nieprawidłowe dane.');
          },
        });
    }
  }
}
