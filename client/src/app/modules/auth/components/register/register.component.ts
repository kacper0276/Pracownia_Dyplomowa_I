import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse, LoginResponseData } from '../../../../shared/models';
import { HttpService } from '../../../../shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

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
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly httpService: HttpService,
    private readonly toast: ToastrService,
    private readonly translate: TranslateService,
    private readonly titleService: Title
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required],
    });

    this.titleService.setTitle(this.translate.instant('register-title'));
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
        this.toast.error(this.translate.instant('passwords-do-not-match'));
        return;
      }

      this.httpService
        .post<ApiResponse<LoginResponseData>>('users/register', registerData)
        .subscribe({
          next: () => {
            this.router.navigate(['/auth/login']);
          },
          error: () => {
            this.toast.error(this.translate.instant('incorrect-data'));
          },
        });
    }
  }
}
