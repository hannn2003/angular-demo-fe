import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

import { DepartmentCode, IUserInfo, RoleAccount } from '@vks/app/shared/models';
import { HttpClient } from '@angular/common/http';
import { IBaseResponse } from '@vks/app/https/base-response.interface';
import { APP_CONFIG } from '@vks/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  baseUrl = `${APP_CONFIG.baseUrl}/api/v1/private/accounts/get-user-info`;
  userInfo$ = new BehaviorSubject<IUserInfo | null>({
    id: 2,
    departmentCode: DepartmentCode.PB_LANH_DAO,
    fullName: 'Nguyễn Thiện Nhân',
    avatar:
      'https://imagedelivery.net/ZeGtsGSjuQe1P3UP_zk3fQ/ede24b65-497e-4940-ea90-06cc2757a200/storedata',
    gender: 'MALE',

    isConditionLogin1: true,
    isConditionLogin2: true,
    isCreateCase: true,
    phoneNumber: '0123455678',
    roleCode: RoleAccount.VIEN_TRUONG,
    organizationName: 'Viện kiểm sát Nam Định',
  });
  roleAccount$ = new BehaviorSubject<RoleAccount | null>(
    RoleAccount.VIEN_TRUONG
  );

  constructor(private http: HttpClient) {
    this.userInfo$.asObservable();
    this.roleAccount$.asObservable();
  }

  getUserInfo(): Observable<IUserInfo> {
    return this.http.get<IBaseResponse<IUserInfo>>(this.baseUrl).pipe(
      switchMap((res) => {
        return of(res.result);
      })
    );
  }

  setUserInfo(userInfo$: IUserInfo | null) {
    if (userInfo$) {
      this.userInfo$.next(userInfo$);
      this.roleAccount$.next(userInfo$.roleCode);
    }
  }

  getRole() {
    return this.roleAccount$.getValue() || null;
  }
}
