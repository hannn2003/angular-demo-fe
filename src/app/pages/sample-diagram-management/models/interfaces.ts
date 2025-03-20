export interface IInterfaces {}

export type DataCollapseMapType = {
    [key in string]: IDataCollapse
}

export interface IDataCollapse {
    list: IDiagramItem[]
    currentActivePage: number
    totalRecords: number
    totalPages: number
}

export interface IDiagramItem {
    id: number
    name: string
    url: string
}
