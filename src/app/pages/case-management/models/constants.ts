import { IFilterFormCase } from '@vks/app/https/case-management/interface.ts'
import { FilterFieldConfig } from '@vks/app/shared/ui-common/filter-common/filter-common.config'
import { ITableHeaderConfig } from '@vks/app/shared/ui-common/table-common/table.common.config'

export const constant = 'constant'

export const DefaultFilterDataCase: IFilterFormCase = {
    citizenId: 0,
    departmentId: 0,
    departmentName: '',
    fromDate: '',
    toDate: '',
    prosecutorId: 0,
    statusId: 0,
    textSearch: '',
    userInChargeId: 0,
}

export const FilterConfigCase: FilterFieldConfig[] = [
    {
        type: 'text',
        label: 'Mã hoặc tên vụ án',
        name: 'textSearch',
        placeholder: 'Nhập từ khoá tìm kiếm',
        col: 3,
    },
    {
        type: 'select',
        label: 'Lãnh đạo phụ trách',
        name: 'userInChargeId',
        options: [],
        placeholder: 'Chọn người phụ trách',
        col: 3,
    },
    {
        type: 'select',
        label: 'Kiểm sát viên',
        name: 'prosecutorId',
        options: [],
        placeholder: 'Chọn kiểm sát viên',
        col: 3,
    },
    {
        type: 'select',
        label: 'Diều tra viên, bị can, bị cáo',
        name: 'citizenId',
        options: [],
        placeholder: 'Chọn điều tra viên, bị can, bị cáo',
        col: 3,
    },
    {
        type: 'date',
        label: 'Từ ngày',
        name: 'fromDate',
        placeholder: 'Lọc từ ngày',
        col: 3,
    },
    {
        type: 'date',
        label: 'Dến ngày',
        name: 'toDate',
        placeholder: 'Lọc đến ngày',
        col: 3,
    },
    {
        type: 'select',
        label: 'Phòng ban',
        name: 'departmentId',
        options: [],
        placeholder: 'Chọn phòng ban',
        col: 3,
    },

    {
        type: 'select',
        label: 'Trạng thái',
        name: 'statusId',
        options: [
            { value: 'ACTIVE', label: 'Hoạt động' },
            { value: 'INACTIVE', label: 'Không hoạt động' },
            { value: 'INITIAL', label: 'Khởi tạo' },
        ],
        placeholder: 'Chọn trạng thái',
        col: 3,
    },
]

export const ConfigHeaderCase: ITableHeaderConfig[] = [
    { key: 'code', name: 'Mã vụ án' },
    { key: 'name', name: 'Tên vụ án' },
    { key: 'departmentName', name: 'Tên phòng ban' },
    { key: 'statusName', name: 'Trạng thái' },
    { key: 'actualTime', name: 'Ngày cập nhật mới nhất', pipe: 'date', pipeArg: ['DD-MM-YYYY'] },
    { key: 'updatedAt', name: 'Ngày lập thực tế', pipe: 'date', pipeArg: ['DD-MM-YYYY'] },
]
