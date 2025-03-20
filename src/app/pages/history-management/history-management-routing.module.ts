import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryManagementComponent } from './screens/history-management.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryManagementRoutingModule {}
