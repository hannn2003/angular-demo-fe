import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccountManagementComponent } from "./screens/account-management.component";
import {
  DetailAccountManagementComponent
} from "./screens/detail-account-management/detail-account-management.component";

const routes: Routes = [
  {
    path: '',
    component: AccountManagementComponent
  },
  {
    path: 'detail',
    component: DetailAccountManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})

export class AccountManagementRoutingModule {
}
