import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { HttpService } from '../../../../shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent {
  @Output() postAdded = new EventEmitter<any>();
  postForm: FormGroup;
  imageError: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    private readonly toast: ToastrService
  ) {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Selected file must be an image.';
        return;
      }

      this.imageError = null;
      const reader = new FileReader();
      reader.onload = () => {
        this.postForm.patchValue({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const postData = {
        ...this.postForm.value,
        userEmail: this.authService.getUser().email,
      };
      this.httpService.post('posts', postData).subscribe({
        next: () => {
          this.toast.success('Post added successfully');
        },
        error: () => {
          this.toast.error('Error adding post');
        },
      });
      this.postAdded.emit(postData);
      this.postForm.reset();
    }
  }
}
