import { Injectable, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable()
export class DestroyService extends Subject<OnDestroy> implements OnDestroy {
    protected unsubscribe$ = new Subject<void>()
    ngOnDestroy() {
        this.unsubscribe$.next() // Phát tín hiệu hủy
        this.unsubscribe$.complete() // Đóng Subject để giải phóng bộ nhớ
    }
}
