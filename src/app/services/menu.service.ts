import { Injectable } from '@angular/core'

import { ERoute } from '@vks/app/shared/layout/layout.model'
import { UserInfoService } from '@vks/app/services/user-info.service'
import { RoleAccount } from '@vks/app/shared/models'

const DEFAULT_ACTIVE_ROUTE: { [role in RoleAccount]?: ERoute } = {
    [RoleAccount.IT_ADMIN]: ERoute.ACCOUNT_MANAGEMENT,
    [RoleAccount.VIEN_TRUONG]: ERoute.DASHBOARD,
    [RoleAccount.VIEN_PHO]: ERoute.DASHBOARD,
    [RoleAccount.TRUONG_PHONG]: ERoute.DASHBOARD,
    [RoleAccount.PHO_PHONG]: ERoute.DASHBOARD,
    [RoleAccount.KIEM_SAT_VIEN]: ERoute.DASHBOARD,
}
@Injectable({
    providedIn: 'root',
})
export class MenuService {
    defaultActiveRoute: ERoute

    constructor(private userInfoService: UserInfoService) {
        const userRole = this.userInfoService.roleAccount$.getValue() as RoleAccount
        this.defaultActiveRoute = DEFAULT_ACTIVE_ROUTE[userRole] || ERoute.DASHBOARD
    }

    getDefaultRoute(userRole: RoleAccount) {
        return DEFAULT_ACTIVE_ROUTE[userRole] || ERoute.DASHBOARD
    }
}
