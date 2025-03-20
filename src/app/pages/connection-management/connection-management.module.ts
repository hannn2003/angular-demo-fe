import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionManagementComponent } from './screens/connection-management.component';
import { ConnectionManagementHttpService } from "./connection-management-http.service";
import { ConnectionManagementStateService } from "./connection-management-state.service";
import { ConnectionManagementRoutingModule } from "./connection-management-routing.module";


@NgModule({
  declarations: [
    ConnectionManagementComponent,
  ], imports: [
    CommonModule, ConnectionManagementRoutingModule
  ], providers: [ConnectionManagementHttpService, ConnectionManagementStateService]
})
export class ConnectionManagementModule {
}
