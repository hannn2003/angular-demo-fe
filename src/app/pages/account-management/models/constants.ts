import { FilterFieldConfig } from '@vks/app/shared/ui-common/filter-common/filter-common.config';
import { IFilterForm } from '@vks/app/https/account-management/interfaces';
import {
  actionConfig,
  ITableHeaderConfig,
} from '@vks/app/shared/ui-common/table-common/table.common.config';
import { KeyAction } from '@vks/app/shared/models';

//List Account config
export const DefaultFilterData: IFilterForm = {
  username: '',
  fullName: '',
  roleId: 0,
  roleName: '',
  departmentId: 0,
  departmentName: '',
  organizationId: 0,
  organizationName: '',
  status: '',
  fromDate: '',
  toDate: '',
};

export const ListAccountActionConfig: actionConfig[] = [
  {
    label: 'Cập nhật',
    icon: 'pi pi-file-edit',
    key: KeyAction.UPDATE,
  },
  { label: 'Xoá', icon: 'pi pi-trash', key: KeyAction.REMOVE },
];

export const FilterConfig: FilterFieldConfig[] = [
  {
    type: 'text',
    label: 'Mã cán bộ',
    name: 'username',
    placeholder: 'Nhập mã',
    col: 3,
  },
  {
    type: 'text',
    label: 'Họ và tên',
    name: 'fullName',
    placeholder: 'Nhập tên',
    col: 3,
  },
  {
    type: 'select',
    label: 'Chức vụ',
    name: 'roleId',
    options: [],
    placeholder: 'Nhập chức vụ',
    col: 3,
  },
  {
    type: 'select',
    label: 'Phòng ban',
    name: 'departmentId',
    options: [],
    placeholder: 'Nhập phòng ban',
    col: 3,
  },
  {
    type: 'select',
    label: 'Đơn vị',
    name: 'organizationId',
    options: [
      {
        value: 'VKS00001',
        label: 'Viện kiểm sát Nam Định',
      },
    ],
    placeholder: 'Nhập đơn vị',
    col: 3,
  },
  {
    type: 'select',
    label: 'Trạng thái',
    name: 'status',
    options: [
      { value: 'ACTIVE', label: 'Hoạt động' },
      { value: 'INACTIVE', label: 'Không hoạt động' },
      { value: 'INITIAL', label: 'Khởi tạo' },
    ],
    placeholder: 'Nhập trạng thái',
    defaultValue: '',
    col: 3,
  },
  {
    type: 'date',
    label: 'Từ ngày',
    name: 'fromDate',
    placeholder: 'Lọc từ ngày',
    action: KeyAction.SELECT_DATE_FROM_TO,
    col: 3,
  },
  {
    type: 'date',
    label: 'Đến ngày',
    name: 'toDate',
    placeholder: 'Lọc đến ngày',
    action: KeyAction.SELECT_DATE_TO,
    col: 3,
  },
];

export const ConfigHeader: ITableHeaderConfig[] = [
  {
    key: 'username',
    name: 'Mã cán bộ',
  },
  {
    key: 'fullName',
    name: 'Họ và tên',
  },
  {
    key: 'roleName',
    name: 'Chức vụ',
    pipe: 'vks-format-role',
  },
  {
    key: 'departmentName',
    name: 'Tên phòng ban',
  },
  {
    key: 'organizationName',
    name: 'Tên đơn vị',
  },
  {
    key: 'status',
    name: 'Trạng thái',
  },
  {
    key: 'actions',
    name: 'Hanh dong',
  },
];
//List Account config
