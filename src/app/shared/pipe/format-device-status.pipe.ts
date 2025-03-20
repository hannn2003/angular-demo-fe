import { Pipe, PipeTransform } from '@angular/core'
import { StatusDevice } from '../models'

@Pipe({
    name: 'formatAccountStatus',
    standalone: true,
})
export class FormatDeviceStatusPipe implements PipeTransform {
    private statusMap: { [key in StatusDevice]: string } = {
        [StatusDevice.CONNECTED]: 'Kết nối',
        [StatusDevice.DISCONNECTED]: 'Không kết nối',
    }

    transform(value?: keyof typeof StatusDevice): string {
        return value ? this.statusMap[value] : ''
    }
}
