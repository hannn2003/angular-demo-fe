import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountManagementApiService } from '@vks/app/https/account-management/account-management-api.service';
import {
  IAccountInfo,
  IFilterForm,
  IListAccountInfo,
} from '@vks/app/https/account-management/interfaces';
import { IBaseResponse } from '@vks/app/https/base-response.interface';
import { IAccountForm } from './models';

@Injectable()
export class AccountManagementHttpService {
  constructor(
    private accountManagementApiService: AccountManagementApiService
  ) {}

  getListAccountManagement(
    data: IFilterForm,
    pageSize: number,
    page: number
  ): Observable<IBaseResponse<IListAccountInfo>> {
    console.log('OKk');
    return this.accountManagementApiService.getListAccount<IListAccountInfo>(
      data,
      { pageSize, page },
      true
    );
  }

  getDetailAccount(accountId: string): Observable<IAccountInfo> {
    return this.accountManagementApiService.getDetailAccount<IAccountInfo>(
      accountId
    );
  }

  editAccount(accountId: string, data: IAccountForm): Observable<any> {
    return this.accountManagementApiService.editAccount(accountId, data);
  }

  getRoles(): Observable<any> {
    return this.accountManagementApiService.getRoles();
  }

  deleteAccount(accountId: string): Observable<any> {
    return this.accountManagementApiService.deleteAccount(accountId);
  }
}
