import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { CaseManagementComponent } from "./screens/case-management.component";

const routes: Routes = [
  {
    path: '',
    component: CaseManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseManagementRoutingModule {
}
