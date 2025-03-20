export interface IFilterFormCase {
    textSearch: string
    userInChargeId: number
    prosecutorId: number
    citizenId: number
    fromDate: string
    toDate: string
    departmentId: number
    departmentName: string
    statusId: number
}

export interface IParamsPagination {
    pageSize: number
    page: number
}

export interface ICaseResponse {
    id: 0
    code: string
    name: string
    departmentName: string
    statusName: string
    actualTime: string
    updatedAt: string
}
export interface IListCaseResponse {
    content: ICaseResponse[]
    totalRecords: number
}
