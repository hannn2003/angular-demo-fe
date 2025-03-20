import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

import { AccountManagementRoutingModule } from './account-manamagement-routing.module';
import { AccountManagementComponent } from './screens/account-management.component';
import { DetailAccountManagementComponent } from '@vks/app/pages/account-management/screens/detail-account-management/detail-account-management.component';
import { FilterCommonComponent } from '@vks/app/shared/ui-common/filter-common/filter-common.component';
import { MenuModule } from 'primeng/menu';
import { TableCommonComponent } from '@vks/app/shared/ui-common/table-common/table-common.component';
import { AccountManagementHttpService } from '@vks/app/pages/account-management/account-management-http.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { FormAccountComponent } from './screens/components/form-account/form-account.component';
import { AccountManagementStateService } from './account-management-state.service';

@NgModule({
  declarations: [
    DetailAccountManagementComponent,
    AccountManagementComponent,
    FormAccountComponent,
  ],
  imports: [
    CommonModule,
    AccountManagementRoutingModule,
    ButtonDirective,
    ToastModule,
    RippleModule,
    ButtonModule,
    FilterCommonComponent,
    MenuModule,
    TableCommonComponent,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    FileUploadModule,
    DropdownModule,
    PasswordModule,
  ],
  providers: [AccountManagementHttpService, AccountManagementStateService],
})
export class AccountManagementModule {}
