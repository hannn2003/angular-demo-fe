import { MenuItem } from 'primeng/api';
import { KeyAction } from '@vks/app/shared/models';

export interface ITableHeaderConfig {
  key: string;
  name: string;
  className?: string;
  tooltip?: boolean;
  width?: number;
  pipe?: string;
  pipeArg?: any[];
  obfuscationInfo?: boolean;
}

export interface actionConfig extends MenuItem {
  label: string;
  key: KeyAction;
  icon: `pi pi-${string}`;
  command?: (val?: any) => void;
}

// -------------------------------
interface demoTableBody {
  code: string;
  name: string;
  category: string;
  quantity: number;
}

export const tableHeaderDemo: ITableHeaderConfig[] = [
  {
    key: 'stt',
    name: 'STT',
    className: 'header-index',
  },
  {
    key: 'code',
    name: 'Code',
    className: 'header-code',
  },
  {
    key: 'name',
    name: 'Name',
    className: 'header-name',
  },
  {
    key: 'category',
    name: 'Category',
    className: 'header-category',
  },
  {
    key: 'quantity',
    name: 'Quantity',
    className: 'header-quantity',
  },
  {
    key: 'actions',
    name: 'Actions',
    className: 'header-action',
  },
];

export const tableBodyDemo: demoTableBody[] = [
  {
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    category: 'Accessories',
    quantity: 24,
  },
  {
    code: 'f230fh0g3',
    name: 'Samsung Watch',
    category: 'Accessories',
    quantity: 25,
  },
  {
    code: 'f230fh0g3',
    name: 'Apple Watch',
    category: 'Accessories',
    quantity: 80,
  },
  {
    code: 'f230fh0g3',
    name: 'Apple Watch',
    category: 'Accessories',
    quantity: 80,
  },
  {
    code: 'f230fh0g3',
    name: 'Apple Watch',
    category: 'Accessories',
    quantity: 80,
  },
  {
    code: 'f230fh0g3',
    name: 'Apple Watch',
    category: 'Accessories',
    quantity: 80,
  },
  {
    code: 'f230fh0g3',
    name: 'Apple Watch',
    category: 'Accessories',
    quantity: 80,
  },
];
