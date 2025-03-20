import { IDropdownItem, KeyAction } from '@vks/app/shared/models'

export interface FilterFieldConfig {
    type: 'text' | 'select' | 'date' // Loại ô input
    label: string // Nhãn của ô input
    name: string // Tên của ô input (dùng để binding dữ liệu)
    col: number // Số lượng cột chiếm trên 12 cột của một hàng
    colGrow?: boolean
    options?: IDropdownItem[] // Danh sách lựa chọn cho select
    placeholder?: string // Placeholder cho input text hoặc date
    action?: KeyAction
    defaultValue?: string | number | boolean
}
