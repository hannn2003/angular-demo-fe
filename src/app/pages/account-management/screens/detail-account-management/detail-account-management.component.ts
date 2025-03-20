import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { NotificationService } from "@vks/app/services/notification.service";
import { EMPTY, switchMap } from "rxjs";
import {
  AccountManagementHttpService
} from "@vks/app/pages/account-management/account-management-http.service";
import { catchError } from "rxjs/operators";

@Component({
  selector: 'vks-detail-account-management',
  templateUrl: './detail-account-management.component.html',
  styleUrl: './detail-account-management.component.scss'
})
export class DetailAccountManagementComponent implements OnInit {

  constructor(
    private accountManagementHttpService: AccountManagementHttpService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      switchMap((params) => {
        return this.getDetailAccount((params.accountId) as string)
      })
    ).subscribe()
  }

  getDetailAccount(accountId: string) {
    return this.accountManagementHttpService.getDetailAccount(accountId).pipe(
      catchError((error) => {
        if(error.message){
          this.notificationService.showMessage({
            severity: 'error',
            summary: 'Lỗi hệ thống',
            detail: error.message
          })
        }
        return EMPTY
      })
    )
  }
}
