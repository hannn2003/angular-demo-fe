import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitManagementComponent } from './screens/unit-management.component';
import { DetailUnitManagementComponent } from './screens/detail-unit-management/detail-unit-management.component';
import { UnitManagementRoutingModule } from "./unit-management-routing.module";
import { UnitManagementHttpService } from "./unit-management-http.service";
import { UnitManagementStateService } from "./unit-management-state.service";



@NgModule({
  declarations: [
    UnitManagementComponent,
    DetailUnitManagementComponent
  ],
  imports: [
    CommonModule,
    UnitManagementRoutingModule
  ],
  providers: [UnitManagementHttpService, UnitManagementStateService]
})
export class UnitManagementModule { }
