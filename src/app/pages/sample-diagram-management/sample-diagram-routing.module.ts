import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { SampleDiagramManagementComponent } from "./screens/sample-diagram-management.component";

const routes: Routes = [
  {
    path: '',
    component: SampleDiagramManagementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleDiagramRoutingModule {
}
