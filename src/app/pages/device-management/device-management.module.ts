import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceManagementComponent } from './screens/device-management.component';
import { DeviceManagementRoutingModule } from "./device-management-routing.module";
import { DeviceManagementHttpService } from "./device-management-http.service";
import { DeviceManagementStateService } from "./device-management-state.service";


@NgModule({
  declarations: [
    DeviceManagementComponent
  ], imports: [
    CommonModule, DeviceManagementRoutingModule
  ], providers: [DeviceManagementHttpService, DeviceManagementStateService]
})
export class DeviceManagementModule {
}
