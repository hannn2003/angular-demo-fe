import { Pipe, PipeTransform } from '@angular/core'
import { CitizenType } from '../models'

@Pipe({
    name: 'formatCitizenType',
    standalone: true,
})
export class FormatCitizenTypePipe implements PipeTransform {
    private statusMap = {
        [CitizenType.INVESTIGATOR]: 'Điều tra viên',
        [CitizenType.SUSPECT]: 'Bị can',
        [CitizenType.DEFENDANT]: 'Bị cáo',
    }
    transform(value: keyof typeof CitizenType | ''): string {
        return value ? this.statusMap[value] : ''
    }
}
