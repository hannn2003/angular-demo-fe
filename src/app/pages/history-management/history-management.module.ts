import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryManagementRoutingModule } from './history-management-routing.module';
import { HistoryManagementComponent } from './screens/history-management.component';

@NgModule({
  declarations: [HistoryManagementComponent],
  imports: [CommonModule, HistoryManagementRoutingModule],
})
export class HistoryManagementModule {}
