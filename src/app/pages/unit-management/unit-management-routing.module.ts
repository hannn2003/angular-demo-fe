import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { DetailUnitManagementComponent } from "./screens/detail-unit-management/detail-unit-management.component";
import { UnitManagementComponent } from "./screens/unit-management.component";

const routes: Routes = [
  {
    path: '',
    component: UnitManagementComponent
  },
  {
    path: 'detail',
    component: DetailUnitManagementComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitManagementRoutingModule { }
