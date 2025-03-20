import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { IFilterFormCase } from './interface.ts'
import { IPaginationParams } from '@vks/app/shared/models'
import { IBaseResponse } from '../base-response.interface'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class CaseManagementApiService {
    urlCase: string = 'http://localhost:3000/case-management'
    constructor(private http: HttpClient) {}
    getListCase<T>(data: IFilterFormCase, params: IPaginationParams): Observable<IBaseResponse<T>> {
        const httpParams = params
            ? new HttpParams({ fromObject: { page: params.page.toString(), pageSize: params.pageSize.toString() } })
            : new HttpParams()

        return this.http.get<IBaseResponse<T>>(this.urlCase, { params: httpParams })
    }
}
