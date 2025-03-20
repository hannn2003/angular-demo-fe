import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EMPTY, finalize, of, switchMap, takeUntil } from 'rxjs';

import {
  AuthService,
  DestroyService,
  NotificationService,
} from '@vks/app/services';
import {
  ERROR_CODE,
  ILoginFirstStep,
  MODE,
  SUCCESS_CODE,
} from '@vks/app/shared/models';
import { Router } from '@angular/router';
import { rootRoute } from '@vks/app/app-routing.module';
import { APP_CONFIG } from '@vks/environments/environment';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'vks-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChildren('inputOtp') inputOtp!: QueryList<ElementRef>;
  personalId = new FormControl<string>('', Validators.required);
  password = new FormControl<string>('', Validators.required);
  inputToken = new FormControl<string>('');

  errors: Record<string, string> = {};
  modeControl = new FormControl<boolean>(true);
  modeOptions: { label: string; value: boolean }[] = [
    {
      label: 'TRỰC TUYẾN',
      value: true,
    },
    {
      label: 'NGOẠI TUYẾN',
      value: false,
    },
  ];

  isVisibleModalRequireUsbOnline = false;
  isVisibleModalRequireUsbOffline = false;
  isVisibleModalChangePassword = false;
  isVisibleModalChangePin = false;
  isAttachUsbOnline = false;
  isAttachUsbOffline = false;
  isLoginSuccess = false;

  isLoadingChangePassword = false;
  isLoadingChangePin = false;
  isLoadingSubmit = false;
  isLoadingFactoryAuth = false;

  firstTimeAccessInfo: ILoginFirstStep = {
    accessToken: '',
    usbCode: '',
    usbVendorCode: '',
  };
  deviceId = '';
  errorPassword? = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  errorCreatePin? = {
    pin: '',
    pin2: '',
  };

  passwordForm = this.fb.group({
    password: ['', Validators.required],
    newPassword: [
      '',
      Validators.compose([Validators.required, Validators.min(8)]),
    ],
    enterNewPassword: [
      '',
      Validators.compose([Validators.required, Validators.min(8)]),
    ],
  });

  createPinForm = this.fb.group({
    pin: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(6)]),
    ],
    reEnterPin: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(6)]),
    ],
  });
  loginPinControl = this.fb.group({
    pin: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      updateOn: 'submit',
    }),
  });

  constructor(
    private authService: AuthService,
    private destroyService: DestroyService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {}

  // onSubmitOnlineLogin() {
  //   if (this.password.valid && this.personalId.valid) {
  //     this.isLoadingSubmit = true;
  //     this.authService
  //       .loginFirstStep({
  //         username: this.personalId.getRawValue() as string,
  //         password: this.password.getRawValue() as string,
  //         currentDeviceId:
  //           this.deviceId ?? '8677726A-C0E0-90D8-907D-08BFB816303E',
  //       })
  //       .pipe(
  //         finalize(() => (this.isLoadingSubmit = false)),
  //         takeUntil(this.destroyService)
  //       )
  //       .subscribe({
  //         next: (res) => {
  //           if (res.code === ERROR_CODE['422']) {
  //             this.errors.password = res.result.password as string;
  //             this.errors.personalId = res.result.username as string;
  //           }
  //           if (res.code != SUCCESS_CODE) {
  //             this.isAttachUsbOnline = false;
  //           } else {
  //             if (APP_CONFIG.production) {
  //               this.isLoginSuccess = true;
  //               this.isVisibleModalRequireUsbOnline = true;
  //               this.cdr.detectChanges();
  //               this.firstTimeAccessInfo = res.result;
  //               this.cdr.detectChanges();
  //               this.handleCheckUsb();
  //             } else {
  //               this.authService.setToken(res.result.accessToken);
  //               void this.router.navigate([rootRoute], {
  //                 queryParams: { isModeOnline: MODE.ONLINE },
  //               });
  //             }
  //           }
  //         },
  //       });
  //   }

  //   if (this.password.invalid) this.password.markAsTouched();
  //   if (this.personalId.invalid) this.personalId.markAsTouched();
  // }

  // onSubmitOfflineLogin() {
  //   if (this.loginPinControl.controls.pin.valid) {
  //     this.inputOtp.forEach((input) => {
  //       input.nativeElement.classList.remove('error-input');
  //     });
  //     this.isVisibleModalRequireUsbOffline = true;
  //     this.cdr.detectChanges();
  //     this.handleCheckUsbModeOffline();
  //   } else {
  //     this.inputOtp.forEach((input) => {
  //       if (!input.nativeElement.value.length) {
  //         input.nativeElement.classList.add('error-input');
  //       } else {
  //         input.nativeElement.classList.remove('error-input');
  //       }
  //     });
  //   }
  // }

  // onDialogVisibleChange(isVisible: boolean) {
  //   if (!isVisible) {
  //     this.cancelLogin();
  //     this.cdr.detectChanges();
  //   } else {
  //     this.isVisibleModalRequireUsbOnline = isVisible;
  //     this.isVisibleModalRequireUsbOffline = isVisible;
  //   }
  // }

  isFieldValid(field: string) {
    return (
      !this.passwordForm?.get(field)?.valid &&
      this.passwordForm.get(field)?.touched
    );
  }

  isFieldLoginPinValid(field: string) {
    return (
      !this.loginPinControl?.get(field)?.valid &&
      this.loginPinControl.get(field)?.touched
    );
  }

  isFieldCreatePinValid(field: string) {
    return (
      !this.loginPinControl?.get(field)?.valid &&
      this.loginPinControl.get(field)?.touched
    );
  }

  onSubmitPassword() {}

  // onCreateNewPin() {}

  // onToggleChangePasswordModal(status: boolean) {
  //   if (!status) {
  //     this.passwordForm.setValue({
  //       password: '',
  //       newPassword: '',
  //       enterNewPassword: '',
  //     });
  //     this.cancelLogin();
  //     this.cdr.detectChanges();
  //   } else {
  //     this.isVisibleModalChangePin = true;
  //   }

  //   this.isVisibleModalChangePassword = status;
  // }

  onShowModal() {
    this.cdr.detectChanges();
  }

  onHideModal() {
    this.cdr.detectChanges();
    this.passwordForm.setValue({
      password: '',
      enterNewPassword: '',
      newPassword: '',
    });
    this.createPinForm.setValue({
      pin: '',
      reEnterPin: '',
    });
    this.errorPassword = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    this.errorCreatePin = {
      pin: '',
      pin2: '',
    };
    this.loginPinControl.setValue({
      pin: '',
    });
  }

  // cancelLogin() {
  //   this.authService.removeToken();
  //   this.isLoginSuccess = false;
  //   this.cdr.detectChanges();
  //   this.isVisibleModalChangePassword = false;
  //   this.cdr.detectChanges();
  //   this.isVisibleModalRequireUsbOnline = false;
  //   this.cdr.detectChanges();
  //   this.isVisibleModalChangePin = false;
  //   this.cdr.detectChanges();
  //   this.isVisibleModalRequireUsbOffline = false;
  //   this.cdr.detectChanges();
  //   this.authService.removeToken();
  //   this.passwordForm.markAsUntouched();
  //   this.handleCheckUsb().unsubscribe();
  //   this.handleCheckUsbModeOffline().unsubscribe();
  //   //reset state
  //   this.password.setValue('');
  //   this.password.markAsUntouched();
  //   this.personalId.setValue('');
  //   this.personalId.markAsUntouched();
  //   this.loginPinControl.controls.pin.setValue('');
  //   this.inputOtp.forEach((input) => {
  //     input.nativeElement.value = '';
  //   });
  //   this.errors = {};
  // }

  // onToggleChangePinModal(status: boolean) {
  //   if (!status) {
  //     this.createPinForm.setValue({
  //       pin: '',
  //       reEnterPin: '',
  //     });
  //     this.cancelLogin();
  //     this.cdr.detectChanges();
  //   } else {
  //     this.isVisibleModalChangePin = status;
  //   }
  // }

  // handleCheckUsb() {
  //   return this.isActiveUsb$
  //     .pipe(
  //       switchMap((isStatusUsb: boolean) => {
  //         this.isAttachUsbOnline = isStatusUsb;
  //         this.cdr.detectChanges();
  //         //Mode online
  //         if (isStatusUsb && this.isLoginSuccess) {
  //           return this.electronService
  //             .accessToUsb(this.firstTimeAccessInfo.accessToken)
  //             .pipe(
  //               switchMap((info: { tokenUsb: string }) => {
  //                 if (info) {
  //                   this.inputToken.setValue(info.tokenUsb);
  //                   this.isVisibleModalRequireUsbOnline = false;
  //                   this.cdr.detectChanges();
  //                 }
  //                 return EMPTY;
  //               }),
  //               takeUntil(this.destroyService)
  //             );
  //         } else if (this.isLoginSuccess && !isStatusUsb) {
  //           this.isVisibleModalRequireUsbOnline = true;
  //           this.cdr.detectChanges();
  //         }
  //         return EMPTY;
  //       }),
  //       takeUntil(this.destroyService)
  //     )
  //     .subscribe();
  // }

  // handleCheckUsbModeOffline() {
  //   return this.isActiveUsb$
  //     .pipe(
  //       switchMap((statusUsb: boolean) => {
  //         this.isAttachUsbOffline = statusUsb;
  //         this.cdr.detectChanges();
  //         if (statusUsb && !this.modeControl.value) {
  //           return this.electronService
  //             .accessToUsbForOfflineMode(
  //               this.loginPinControl.getRawValue().pin!
  //             )
  //             .pipe(
  //               switchMap((info: { tokenUsb: string }) => {
  //                 if (info) {
  //                   this.authService.setToken(info.tokenUsb);
  //                   this.electronService.isOnlineMode$.next(false);
  //                   return of(info);
  //                 }
  //                 return EMPTY;
  //               }),
  //               catchError(() => {
  //                 this.isAttachUsbOffline = false;
  //                 this.cdr.detectChanges();
  //                 return EMPTY;
  //               }),
  //               takeUntil(this.destroyService)
  //             );
  //         }
  //         return EMPTY;
  //       }),
  //       takeUntil(this.destroyService)
  //     )
  //     .subscribe((res) => {
  //       if (res) {
  //         void this.router.navigate(['/vien-kiem-sat/case-management'], {
  //           queryParams: { isModeOnline: MODE.OFFLINE },
  //           state: { mode: true },
  //         });
  //       }
  //     });
  // }

  // handleGetFactoryAuthentication() {
  //   this.isLoadingFactoryAuth = true;
  //   this.electronService
  //     .factoryAuthentication(
  //       this.inputToken.getRawValue() as string,
  //       this.firstTimeAccessInfo.accessToken
  //     )
  //     .pipe(
  //       finalize(() => (this.isLoadingFactoryAuth = false)),
  //       takeUntil(this.destroyService)
  //     )
  //     .subscribe((res) => {
  //       if (res.code !== SUCCESS_CODE) {
  //         this.cdr.detectChanges();
  //         this.isLoginSuccess = false;
  //         return;
  //       }

  //       if (!res.result.isConditionLogin1) {
  //         this.isVisibleModalChangePassword = true;
  //         this.cdr.detectChanges();
  //       } else if (
  //         res.result.isConditionLogin1 &&
  //         !res.result.isConditionLogin2
  //       ) {
  //         this.isVisibleModalChangePin = true;
  //         this.cdr.detectChanges();
  //       } else {
  //         void this.router.navigate([rootRoute], {
  //           queryParams: { isModeOnline: MODE.ONLINE },
  //         });
  //         this.isLoginSuccess = false;
  //         this.handleCheckUsb().unsubscribe();
  //       }
  //     });
  // }

  ngOnDestroy() {
    // this.electronService.turnOffActivationUsb();
    // this.isActiveUsb$.complete();
  }
}
