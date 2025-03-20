import { Pipe, PipeTransform } from '@angular/core'
import { CaseType } from '../models'

@Pipe({
    name: 'formatCaseType',
    standalone: true,
})
export class FormatCaseTypePipe implements PipeTransform {
    transform(value?: string): string {
        let result = ''
        if (value === CaseType.DAN_SU) result = 'Dân sự'
        else if (value === CaseType.HINH_SU) result = 'Hình sự'
        return result
    }
}
