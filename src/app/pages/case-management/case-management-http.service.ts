import { Injectable } from '@angular/core'
import { IBaseResponse } from '@vks/app/https/base-response.interface'
import { CaseManagementApiService } from '@vks/app/https/case-management/case-management-api.service'
import { IFilterFormCase, IListCaseResponse } from '@vks/app/https/case-management/interface.ts'
import { Observable } from 'rxjs'

@Injectable()
export class CaseManagementHttpService {
    constructor(private caseManagementApiService: CaseManagementApiService) {}

    getListCaseManagement(
        data: IFilterFormCase,
        pageSize: number,
        page: number,
    ): Observable<IBaseResponse<IListCaseResponse>> {
        return this.caseManagementApiService.getListCase<IListCaseResponse>(data, { page, pageSize })
    }
}
