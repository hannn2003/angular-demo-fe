import { Pipe, PipeTransform } from '@angular/core'

import { GENDER } from '@vks/app/shared/models'

@Pipe({
    name: 'formatGender',
    standalone: true,
    pure: true,
})
export class FormatGenderPipe implements PipeTransform {
    transform(code?: keyof typeof GENDER): string {
        if (code === 'MALE') {
            return 'Nam'
        } else if (code === 'FEMALE') {
            return 'Nữ'
        } else {
            return ''
        }
    }
}
