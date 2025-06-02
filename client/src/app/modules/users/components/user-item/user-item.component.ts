import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../../../shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss',
})
export class UserItemComponent implements OnInit, OnChanges {
  @Input() user!: User;
  @Output() save = new EventEmitter<User>();
  @Output() delete = new EventEmitter<number>();

  editForm!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.initForm();
    }
  }

  initForm() {
    this.editForm = this.fb.group({
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      login: [this.user?.login || '', Validators.required],
      firstName: [this.user?.firstName || ''],
      lastName: [this.user?.lastName || ''],
      role: [this.user?.role || 'user', Validators.required],
      password: [''],
    });
  }

  onSave() {
    const updated = { ...this.user, ...this.editForm.value };
    if (!updated.password) delete updated.password;
    this.save.emit(updated);
  }
}
