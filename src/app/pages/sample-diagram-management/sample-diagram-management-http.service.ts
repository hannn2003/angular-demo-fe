import { Injectable } from '@angular/core'
import { DiagramManagementService } from '@vks/app/https/diagram-management/diagram-management.service'
import { IGetListDiagram, IListDiagram } from '@vks/app/https/diagram-management/interfaces'
import { Observable } from 'rxjs'

@Injectable()
export class SampleDiagramManagementHttpService {
    constructor(private diagramManagementApiService: DiagramManagementService) {}
    getListDiagrams(data: IGetListDiagram, page: number, pageSize: number): Observable<IListDiagram> {
        return this.diagramManagementApiService.getListDiagrams<IListDiagram>(data, { page, pageSize })
    }
}
