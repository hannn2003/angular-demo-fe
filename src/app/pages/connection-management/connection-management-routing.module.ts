import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ConnectionManagementComponent } from "./screens/connection-management.component";

const routes: Routes = [
  {
    path: '',
    component: ConnectionManagementComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionManagementRoutingModule { }
