import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CaseManagementComponent } from './screens/case-management.component'
import { CaseManagementRoutingModule } from './case-management-routing.module'
import { CaseManagementHttpService } from './case-management-http.service'
import { CaseManagementStateService } from './case-management-state.service'
import { FilterCommonComponent } from '../../shared/ui-common/filter-common/filter-common.component'
import { TableCommonComponent } from '../../shared/ui-common/table-common/table-common.component'
import { ButtonModule } from 'primeng/button'

@NgModule({
    declarations: [CaseManagementComponent],
    imports: [CommonModule, CaseManagementRoutingModule, FilterCommonComponent, TableCommonComponent, ButtonModule],
    providers: [CaseManagementHttpService, CaseManagementStateService],
})
export class CaseManagementModule {}
