import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { StatusManagementComponent } from "./screens/status-management.component";

const routes: Routes = [
  {
    path: '',
    component: StatusManagementComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusManagementRoutingModule { }
