import { Pipe, PipeTransform } from '@angular/core'

import { DepartmentCode } from '@vks/app/shared/models'

@Pipe({
    name: 'formatDepartment',
    standalone: true,
    pure: true,
})
export class FormatDepartmentPipe implements PipeTransform {
    private departmentMap: { [key in DepartmentCode]: string } = {
        [DepartmentCode.PB_LANH_DAO]: 'Lãnh đạo',
        [DepartmentCode.PB_AN_NINH_MA_TUY]: 'An ninh - Ma Túy',
        [DepartmentCode.PB_THI_HANH_AN]: 'Kinh tế - Tham nhũng',
        [DepartmentCode.PB_THANH_TRA_KHIEU_TO]: 'Thanh tra - khiếu tố',
        [DepartmentCode.PB_KHIEU_NAI_TO_CAO]: 'Khiếu nại tố cáo',
        [DepartmentCode.PB_KINH_TE_THAM_NHUNG]: 'Kinh tế - Tham nhũng',
        [DepartmentCode.PB_KY_THUAT]: 'Kỹ thuật',
        [DepartmentCode.PB_TRAT_TU_XA_HOI]: 'Trật tự xã hội',
        [DepartmentCode.PB_DAN_SU_HANH_CHINH_KINH_DOANH]: 'Dân sự, hành chính, kinh doanh, thương mại',
        [DepartmentCode.PB_TO_CHUC_CAN_BO]: 'Tổ chức cán bộ',
    }

    transform(code: DepartmentCode): string {
        if (code) {
            return this.departmentMap[code] || code
        } else {
            return ''
        }
    }
}
