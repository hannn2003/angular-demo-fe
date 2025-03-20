export interface IGetListDiagram {
    departmentId: number
    textSearch: string
}

export interface IParamsPagination {
    pageSize: number
    page: number
}

export interface IListDiagram {
    content: IDiagram[]
    totalRecords: number
    totalPages: number
    page: number
    pageSize: number
}

export interface IDiagram {
    id: number
    name: string
    url: string
}

//create

export interface ICreateDiagram {
    departmentId: number
    departmentName: string
    name: string
}

export interface ICreateDiagramRes {
    id: number
    name: string
    url: string
    dataNote: string
    dataLink:string
}
