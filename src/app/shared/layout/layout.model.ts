import { rootRoute } from '@vks/app/app-routing.module'

import { RoleAccount } from '../models'

export enum EActiveStatus {
    DASHBOARD = `/${rootRoute}/dashboard`,
    ACCOUNT_MANAGEMENT = `/${rootRoute}/account-management`,
    UNIT_MANAGEMENT = `/${rootRoute}/unit-management`,
    SAMPLE_DIAGRAM_MANAGEMENT = `/${rootRoute}/sample-diagram-management`,
    CASE_MANAGEMENT = `/${rootRoute}/case-management`,
    DEPARTMENT_MANAGEMENT = `/${rootRoute}/department-management`,
    STATUS_MANAGEMENT = `/${rootRoute}/status-management`,
    USB_MANAGEMENT = `/${rootRoute}/usb-management`,
    DEVICE_MANAGEMENT = `/${rootRoute}/device-management`,
    PROFILE_MANAGEMENT = `${rootRoute}/profile-management`,
    SYSTEM_HISTORY_MANAGEMENT = `/${rootRoute}/system-history-management`,
}

export enum ERoute {
    DASHBOARD = `${rootRoute}/dashboard`,
    ACCOUNT_MANAGEMENT = `${rootRoute}/account-management`,
    UNIT_MANAGEMENT = `${rootRoute}/unit-management`,
    SAMPLE_DIAGRAM_MANAGEMENT = `${rootRoute}/sample-diagram-management`,
    CASE_MANAGEMENT = `${rootRoute}/case-management`,
    DEPARTMENT_MANAGEMENT = `${rootRoute}/department-management`,
    STATUS_MANAGEMENT = `${rootRoute}/status-management`,
    USB_MANAGEMENT = `${rootRoute}/usb-management`,
    DEVICE_MANAGEMENT = `${rootRoute}/device-management`,
    PROFILE_MANAGEMENT = `${rootRoute}/profile-management`,
    SYSTEM_HISTORY_MANAGEMENT = `${rootRoute}/system-history-management`,
}

export interface MenuItemModel {
    label: string
    icon?: `pi pi-${string}`
    activeStatus: EActiveStatus
    canView: RoleAccount[]
    action(): void
}
export interface ProfileItemModel {
    activeStatus: EActiveStatus
    canView: RoleAccount[]
    action(): void
}
