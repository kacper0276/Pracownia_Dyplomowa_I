import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserService } from '../../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-show-user-settings',
  templateUrl: './show-user-settings.component.html',
  styleUrl: './show-user-settings.component.scss',
})
export class ShowUserSettingsComponent implements OnInit {
  settingsForm!: FormGroup;
  profileImageBase64: string | null = null;
  backgroundImageBase64: string | null = null;
  showPassword = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly toast: ToastrService,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.settingsForm = this.fb.group({
      firstName: [user?.firstName || ''],
      lastName: [user?.lastName || ''],
      login: [user?.login || '', Validators.required],
      password: [''],
      profileImage: [user?.profileImage || null],
      backgroundImage: [user?.backgroundImage || null],
      bio: [user?.bio || ''],
    });

    this.profileImageBase64 = user?.profileImage || null;
    this.backgroundImageBase64 = user?.backgroundImage || null;
  }

  onFileChange(event: Event, type: 'profileImage' | 'backgroundImage'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        if (type === 'profileImage') {
          this.profileImageBase64 = base64;
          this.settingsForm.patchValue({ profileImage: base64 });
        } else {
          this.backgroundImageBase64 = base64;
          this.settingsForm.patchValue({ backgroundImage: base64 });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      const formValue = this.settingsForm.value;
      const user = this.authService.getUser();
      if (!user) return;

      this.userService.updateUserData(user.id, formValue).subscribe({
        next: (updatedUser) => {
          if (updatedUser.data) this.authService.setUser(updatedUser.data);
          this.toast.success(this.translate.instant('settings-saved-success'));
        },
        error: () => {
          this.toast.error(this.translate.instant('settings-save-error'));
        },
      });
    }
  }
}
