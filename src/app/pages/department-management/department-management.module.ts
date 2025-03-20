import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentManagementRoutingModule } from "./department-management-routing.module";
import { DepartmentManagementStateService } from "./department-management-state.service";
import { DepartmentManagementHttpService } from "./department-management-http.service";
import { DepartmentManagementComponent } from "./screens/department-management.component";

@NgModule({
  declarations: [DepartmentManagementComponent],
  imports: [
    CommonModule,
    DepartmentManagementRoutingModule
  ],
  providers: [DepartmentManagementStateService, DepartmentManagementHttpService]
})
export class DepartmentManagementModule {
}
