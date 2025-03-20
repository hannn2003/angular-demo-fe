import { DepartmentCode, KeyCategory, RoleAccount } from '@vks/app/shared/models/enums'

export interface IUserInfo {
    id?: number
    departmentCode: DepartmentCode
    fullName: string
    avatar?: string
    gender: 'MALE' | 'FEMALE'
    isConditionLogin1: boolean
    isConditionLogin2: boolean
    isCreateCase: boolean
    phoneNumber: string
    roleCode: RoleAccount
    organizationName: string
}

export interface IDropdownItem {
    label: string
    value: string | number
}

export interface ICategoryItem {
    id: number
    code?: string
    name: string
}

export interface ICategory {
    [KeyCategory.ROLE]: ICategoryItem[]
    [KeyCategory.DEPARTMENT]: ICategoryItem[]
    [KeyCategory.ORGANIZATION]: ICategoryItem[]
}

export interface INotify {
    summary?: string
    detail?: string
    severity: 'success' | 'error' | 'warn'
}

export interface ILoginFirstStep {
    accessToken: string
    usbCode: string
    usbVendorCode: string
    password?: string
    username?: string
}

export interface IUsbInfo {
    usbDisk: string
    serialNumber: number | string
    idVendor: number
    idDevice: string
    portApp: number
}

export type IErrorBag<T> = Partial<Record<keyof T, string>>

export interface IPaginationParams {
    page: number
    pageSize: number
}

export interface IPaginationWithSearchParams extends IPaginationParams {
    textSearch: string
}
