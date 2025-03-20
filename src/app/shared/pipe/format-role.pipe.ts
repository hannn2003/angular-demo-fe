import { Pipe, PipeTransform } from '@angular/core'

import { RoleAccount } from '../models'

@Pipe({
    name: 'formatRole',
    standalone: true,
    pure: true,
})
export class FormatRolePipe implements PipeTransform {
    private rolesMap: { [key in RoleAccount]: string } = {
        [RoleAccount.VIEN_TRUONG]: 'Viện trưởng',
        [RoleAccount.VIEN_PHO]: 'Viện phó',
        [RoleAccount.IT_ADMIN]: 'ItAdmin',
        [RoleAccount.TRUONG_PHONG]: 'Trưởng phòng',
        [RoleAccount.PHO_PHONG]: 'Phó phòng',
        [RoleAccount.KIEM_SAT_VIEN]: 'Kiểm sát viên',
    }

    transform(value: RoleAccount): string {
        if (value) {
            return this.rolesMap[value] || value
        } else {
            return ''
        }
    }
}
