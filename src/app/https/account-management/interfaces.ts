export interface IListAccountInfo {
    content: IAccountInfo[]
    totalRecords: number
}

export interface IAccountInfo {
    id: number
    username: string
    fullName: string
    roleName: string
    departmentName: string
    organizationName: string
    status: string
}

export interface IFilterForm {
    username: string
    fullName: string
    roleId: number
    roleName: string
    departmentId: number
    departmentName: string
    organizationId: number
    organizationName: string
    status: string
    fromDate: string
    toDate: string
}

export interface IParamsPagination {
    pageSize: number
    page: number
}
