import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { EMPTY, Observable, switchMap, takeUntil, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import {
  IUserInfo,
  NO_EXISTS_TOKEN,
  SUCCESS_CODE,
} from '@vks/app/shared/models';

import {
  AuthService,
  DestroyService,
  NotificationService,
  UserInfoService,
} from '../../services';
import { IBaseResponse } from '@vks/app/https/base-response.interface';
import { ERROR_CODE_TO_SHOW_NOTIFICATION } from '@vks/app/https/interceptor/error-code';

//TODO: xoá sau
export interface IResponse {
  account: {
    id: number;
    employeeId: number;
    userInfo: IUserInfo;
  };
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private userInfoService: UserInfoService,
    private destroyService: DestroyService
  ) {}

  handleStatusError(status: number): Observable<typeof EMPTY> {
    if ([404, 401, 403, 500, 400].includes(status)) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Hệ thống đang xảy ra vấn đề, vui lòng thử lại!';
          break;
        case 401:
          message = 'Không xác định được người dùng!';
          break;
        case 404:
          message = 'Đường dẫn không tìm thấy!';
          break;
        case 400:
          this.notificationService.showMessage({
            summary: 'Cảnh báo',
            severity: 'warn',
            detail: 'Thông tin gửi xuống máy chủ không đúng!',
          });
          break;
        case 403:
          message = 'Bạn không có quyền truy cập hoặc hết hạn đăng nhập!';
          return this.authService
            .logout()
            .pipe(takeUntil(this.destroyService))
            .pipe(
              switchMap(() => {
                void this.router.navigate(['/login']);
                this.authService.removeToken();
                this.authService.loggedIn.next(false);
                this.userInfoService.setUserInfo(null);
                this.userInfoService.roleAccount$.next(null);
                return EMPTY;
              })
            );
      }
      this.notificationService.showMessage({
        severity: 'error',
        detail: message,
      });
    }
    return EMPTY;
  }

  handleBusinessErrorCode(
    code: string,
    message: string
  ): Observable<typeof EMPTY> | void {
    const showMessage = ERROR_CODE_TO_SHOW_NOTIFICATION.includes(code);
    if (showMessage) {
      this.notificationService.showMessage({
        severity: 'error',
        detail: message,
      });
      return EMPTY;
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.authService.getToken();
    if (token) {
      // Clone và modify yêu cầu
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(req).pipe(
        tap((event: HttpEvent<IBaseResponse<any>>) => {
          if (event instanceof HttpResponse) {
            if (event.url?.endsWith('/logout')) {
              this.authService.removeToken();
              this.authService.loggedIn.next(false);
            }

            if (event?.body?.code !== SUCCESS_CODE) {
              this.handleBusinessErrorCode(
                event?.body?.code as string,
                event?.body?.message as string
              );
            }

            if (event.url?.endsWith('/get-user-info')) {
              this.userInfoService.setUserInfo(event.body?.result as IUserInfo);
            }
          }
          return event;
        }),
        catchError((err: HttpErrorResponse) => {
          this.handleStatusError(err.status);
          return throwError(() => err);
        })
      );
    }
    // Chuyển yêu cầu đã được modify đến next handler.
    return next.handle(req).pipe(
      //TODO: Thay IResponse = IBaseResponse
      tap((event: HttpEvent<IBaseResponse<any>>) => {
        //Đoạn này sẽ thay thế của event.body.userInfo
        if (event instanceof HttpResponse) {
          // Lấy token từ response header
          if (event.url?.endsWith('/auth/2FA')) {
            const newToken = event.body?.result?.accessToken as string;

            if (newToken && newToken.length) {
              // Lưu token vào cookie
              this.authService.setToken(newToken);
              // void this.router.navigate(['/vien-kiem-sat'])
            }
          }
          if (event?.body?.code !== SUCCESS_CODE) {
            this.handleBusinessErrorCode(
              event?.body?.code as string,
              event?.body?.message as string
            );
          }
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.message === NO_EXISTS_TOKEN) {
          this.notificationService.showMessage({
            summary: 'Hệ thống không nhận diện được người dùng',
            severity: 'warn',
          });
        }

        this.handleStatusError(err.status);
        // Xử lý các lỗi khác
        return throwError(() => err);
      })
    );
  }
}
