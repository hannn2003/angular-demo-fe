import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { IDropdownItem, REGEX_PHONE_NUMBER } from '@vks/app/shared/models';
import { IAccountForm } from '@vks/app/pages/account-management/models';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { IAccountInfo } from '@vks/app/https/account-management/interfaces';

@Component({
  selector: 'vks-form-account',
  templateUrl: './form-account.component.html',
  styleUrl: './form-account.component.scss',
})
export class FormAccountComponent {
  @Input() listRoles: IDropdownItem[] = [];
  @Input() roleName: string | undefined = '';

  @Input()
  errors: Record<keyof IAccountForm, string[]> = {
    username: [],
    avatar: [],
    fullName: [],
    roleId: [],
    departmentId: [],
    organizationId: [],
    phoneNumber: [],
    password: [],
  };

  @Input() accountDetail: IAccountInfo | null = null;

  @Input() isEditMode: boolean = false;

  @Output()
  unActiveForm = new EventEmitter();

  @Output() forward = new EventEmitter<IAccountForm>();

  @ViewChild('avatarInput') avatarInput: FileUpload | null = null;

  submitted = false;
  imageForUpload: (File & { objectURL: string }) | null = null;

  accountForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    roleId: [null, [Validators.required]],
    departmentId: [null, [Validators.required]],
    organizationId: [null, [Validators.required]],
    phoneNumber: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    if (!this.isEditMode) {
      this.resetForm();
    }
  }

  onSelectAvatar(event: FileSelectEvent) {
    const files = event.files;
    if (Array.from(files).length) {
      const file = files[0];
      const objectURL = URL.createObjectURL(new Blob([file]));
      this.imageForUpload = {
        ...file,
        objectURL,
      };
      this.accountForm.controls['avatar'].setValue('objectURL');
    }

    if (this.avatarInput?.files.length) {
      this.avatarInput.clearInputElement();
      this.avatarInput.clearIEInput();
      this.avatarInput.clear();
    }
  }

  onRemoveAvatar() {
    this.imageForUpload = null;
    this.accountForm.controls['avatar'].setValue('');
    console.log('avatarInput', this.avatarInput);
    if (this.avatarInput?.files) {
      this.avatarInput.clearInputElement();
      this.avatarInput.clearIEInput();
      this.avatarInput.clear();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accountDetail'] && this.accountDetail) {
      this.accountForm.patchValue({
        username: this.accountDetail.username || '',
        fullName: this.accountDetail.fullName || '',
        roleId: this.accountDetail.roleId || null,
        phoneNumber: this.accountDetail.phoneNumber || '',
        password: '',
      });

      if (this.isEditMode) {
        this.accountForm.get('password')?.clearValidators();
        this.accountForm.get('password')?.updateValueAndValidity();
      } else {
        this.accountForm.get('password')?.setValidators([Validators.required]);
        this.accountForm.get('password')?.updateValueAndValidity();
      }
    }

    if (changes['isEditMode']) {
      if (!this.isEditMode) {
        this.resetForm();
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.accountForm.valid) {
      const formData = this.accountForm.value;

      if (this.isEditMode) {
        delete formData.password;
      }

      this.forward.emit(formData);
    }
  }

  onCloseModal() {
    this.unActiveForm.emit();
    this.resetForm();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.accountForm.get(fieldName);
    return (field?.errors?.required &&
      field.touched &&
      this.submitted) as boolean;
  }

  isPhoneNumberInvalid(fieldName: string): boolean {
    const field = this.accountForm.get(fieldName);
    return (field?.errors?.pattern &&
      field?.touched &&
      this.submitted) as boolean;
  }

  resetForm() {
    this.submitted = false;
    this.accountForm.reset({
      username: '',
      avatar: '',
      fullName: '',
      roleId: null,
      departmentId: null,
      organizationId: null,
      phoneNumber: '',
      password: { value: '', disabled: true },
    });

    this.imageForUpload = null;
    if (this.avatarInput) {
      this.avatarInput.clearInputElement();
      this.avatarInput.clearIEInput();
      this.avatarInput.clear();
    }

    Object.keys(this.accountForm.controls).forEach((key) => {
      const control = this.accountForm.get(key) as FormControl;
      control.markAsPristine();
      control.markAsUntouched();
      control.updateValueAndValidity();
    });
  }
}
