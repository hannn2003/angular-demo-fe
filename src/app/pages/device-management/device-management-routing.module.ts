import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DeviceManagementComponent } from "./screens/device-management.component";

const routes: Routes = [
  {
    path: '',
    component: DeviceManagementComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceManagementRoutingModule { }
