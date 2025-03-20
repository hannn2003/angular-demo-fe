import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, ButtonDirective } from "primeng/button";
import { MenuModule } from "primeng/menu";
import { ToastModule } from "primeng/toast";
import { Ripple } from "primeng/ripple";

import { TableCommonComponent } from "../../shared//ui-common/table-common/table-common.component";
import { FilterCommonComponent } from "../../shared/ui-common/filter-common/filter-common.component";
import { DashboardComponent } from './screens/dashboard.component';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardHttpService } from "./dashboard-http.service";
import { DashboardStateService } from "./dashboard-state.service";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TableCommonComponent,
    ButtonDirective,
    Button,
    MenuModule,
    ToastModule,
    Ripple,
    FilterCommonComponent
  ],
  providers: [DashboardHttpService, DashboardStateService]
})
export class DashboardModule {
}
