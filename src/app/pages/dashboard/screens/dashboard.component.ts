import { Component } from '@angular/core';
import {
  ConfigHeader,
} from "@vks/app/pages/account-management/models";
import { IAccountInfo } from "@vks/app/https/account-management/interfaces";

@Component({
  selector: 'vks-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly title = 'Danh sách tài khoản'
  readonly configHeader = ConfigHeader

  listAccount: IAccountInfo[] = []
}
