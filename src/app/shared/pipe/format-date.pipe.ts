import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(
    value: string | Date | number,
    format: string = 'YYYY-MM-DD'
  ): string {
    return dayjs(value).format(format);
  }
}
