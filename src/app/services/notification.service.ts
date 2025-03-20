import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { INotify } from '@vks/app/shared/models'

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private messageService: MessageService) {}

    showMessage(notify: INotify) {
        const successIcon = (notify.severity === 'success' && 'pi-check-circle') as string
        const errorIcon = (notify.severity === 'error' && 'pi-exclamation-circle') as string
        const warningIcon = (notify.severity === 'warn' && 'pi-exclamation-triangle') as string

        this.messageService.add({
            severity: notify.severity,
            styleClass: 'notify',
            summary: notify.summary || 'Thông báo',
            detail: notify.detail || '',
            icon: successIcon || errorIcon || warningIcon,
        })
    }
}
