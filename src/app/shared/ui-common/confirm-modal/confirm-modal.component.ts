import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DialogModule } from 'primeng/dialog'
import { Button } from 'primeng/button'
import { Ripple } from 'primeng/ripple'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'vks-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrl: './confirm-modal.component.scss',
    standalone: true,
    imports: [DialogModule, Button, Ripple, CommonModule],
})
export class ConfirmModalComponent {
    @Input() isVisible = false
    @Input() title = ''
    @Input() textCancel = 'Hủy'
    @Input() textConfirm = 'Xác nhận'
    @Input() btnConfirmColor: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' = 'primary'
    @Input() btnCancelColor: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' = 'primary'
    @Input() showOverlay = false

    @Input() hideCancel = false
    @Input() hideConfirm = false

    @Output() cancel = new EventEmitter()
    @Output() confirm = new EventEmitter()

    onConfirm() {
        this.confirm.emit()
    }

    onCancel() {
        this.cancel.emit()
    }
}
