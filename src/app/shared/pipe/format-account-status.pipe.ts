import { Pipe, PipeTransform } from '@angular/core'
import { StatusAccount } from '../models'

@Pipe({
    name: 'formatAccountStatus',
    standalone: true,
})
export class FormatAccountStatusPipe implements PipeTransform {
    private statusMap = {
        [StatusAccount.ACTIVE]: 'Hoạt động',
        [StatusAccount.INACTIVE]: 'Không hoạt động',
        [StatusAccount.INITIAL]: 'Khởi tạo',
    }
    transform(value?: keyof typeof StatusAccount): string {
        return value ? this.statusMap[value] : ''
    }
}
