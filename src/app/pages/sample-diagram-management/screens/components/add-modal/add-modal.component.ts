import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { regexNameDiagram, TITLE } from '../../../models'
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'
import { DepartmentCode, ICategoryItem, IUserInfo } from '@vks/app/shared/models'

@Component({
    selector: 'vks-add-modal',
    templateUrl: './add-modal.component.html',
    styleUrl: './add-modal.component.scss',
})
export class AddModalComponent implements OnChanges {
    @Input() isVisible: boolean = false
    @Input() userInfo: IUserInfo | null = null
    @Input() departmentList: ICategoryItem[] = []

    @Output() cancel = new EventEmitter()
    readonly TITLE = TITLE

    modalData = this.fb.group({
        name: ['', [Validators.required]],
        department: new FormControl(
            {
                value: '',
                disabled: false,
            },
            Validators.required,
        ),
    })

    nameValidator(): ValidatorFn {
        // validatorFn là một hàm nhận tham số AbstractControl và trả về một ValidationError
        return (control: AbstractControl): ValidationErrors | null => {
            // ValidationError là một object chứa lỗi nếu không hợp lệ
            const forbidden = regexNameDiagram.test(control.value as string) // ép kiểu control về chuỗi vì biểu thức chính quy làm việc với chuỗi
            return forbidden ? { invalidName: { value: control.value } } : null
        }
    }

    constructor(private fb: FormBuilder) {}
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['userInfo']) {
            if (this.userInfo && this.userInfo.departmentCode !== DepartmentCode.PB_KY_THUAT) {
                this.departmentList.forEach((item: ICategoryItem) => {
                    if (this.userInfo && item.code === this.userInfo?.departmentCode) {
                        this.modalData.controls['department'].setValue(item.code)
                        this.modalData.get('department')?.disable()
                    }
                })
            }
        }
    }

    onCancel() {
        // this.modalData.reset()
        this.cancel.emit()
    }

    onCreate() {}
}
