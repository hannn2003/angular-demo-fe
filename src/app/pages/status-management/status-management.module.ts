import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusManagementComponent } from "./screens/status-management.component";
import { StatusManagementRoutingModule } from "./status-management-routing.module";
import { StatusManagementStateService } from "./status-management-state.service";
import { StatusManagementHttpService } from "./status-management-http.service";



@NgModule({
  declarations: [StatusManagementComponent],
  imports: [
    CommonModule,
    StatusManagementRoutingModule
  ],
  providers: [StatusManagementStateService, StatusManagementHttpService]
})
export class StatusManagementModule { }
