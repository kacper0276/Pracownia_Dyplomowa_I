import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../shared/services/user.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { ConversationService } from '../../../../shared/services/conversation.service';

@Component({
  selector: 'create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrl: './create-group-modal.component.scss',
})
export class CreateGroupModalComponent implements OnInit {
  @Output() isOpenChange = new EventEmitter<boolean>();
  groupForm: FormGroup;
  groupImageBase64: string | null = null;
  friends: any[] = [];
  selectedFriends: any[] = [];
  dropdownSettings = {
    idField: 'id',
    textField: 'fullName',
    selectAllText: 'Zaznacz wszystko',
    unSelectAllText: 'Odznacz wszystko',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  constructor(
    private readonly fb: FormBuilder,
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    this.groupForm = this.fb.group({
      groupName: ['', Validators.required],
      groupImage: [null],
      participants: [[], Validators.required],
    });
  }

  ngOnInit() {
    this.userService
      .getFriends(this.authService.getUserId())
      .subscribe((res) => {
        this.friends = (res.data || []).map((f: any) => ({
          ...f,
          fullName:
            f.firstName && f.lastName
              ? `${f.firstName} ${f.lastName}`
              : f.login,
        }));
      });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.groupImageBase64 = reader.result as string;
        this.groupForm.patchValue({ groupImage: this.groupImageBase64 });
      };
      reader.readAsDataURL(file);
    }
  }

  createGroup() {
    if (this.groupForm.invalid) return;
    const { groupName, groupImage, participants } = this.groupForm.value;
    const participantIds = (participants || []).map((p: any) => p.id ?? p);
    participantIds.push(this.authService.getUserId());
    const payload = {
      groupName,
      groupImage,
      isGroupChat: true,
    };
    this.conversationService
      .createConversation(payload, participantIds)
      .subscribe({
        next: () => {
          this.close();
        },
        error: () => {},
      });
  }

  close() {
    this.isOpenChange.emit(false);
    this.groupForm.reset();
    this.groupImageBase64 = null;
    this.selectedFriends = [];
  }
}
