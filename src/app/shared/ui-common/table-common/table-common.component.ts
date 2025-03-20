import {
  Component,
  ContentChild,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
} from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { Button, ButtonDirective } from 'primeng/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { InputIconModule } from 'primeng/inputicon';
import { MenuModule } from 'primeng/menu';

import { ITableHeaderConfig } from './table.common.config';
import { FormatRolePipe } from '@vks/app/shared/pipe/format-role.pipe';
import { FormatAccountStatusPipe } from '@vks/app/shared/pipe/format-account-status.pipe';
import { rowsPerPageOptions } from '@vks/app/shared/models';
import { SkeletonModule } from 'primeng/skeleton';
import { FormatDeviceStatusPipe } from '@vks/app/shared/pipe/format-device-status.pipe';
import { FormatDatePipe } from '../../pipe';

@Component({
  selector: 'vks-table-common',
  templateUrl: './table-common.component.html',
  styleUrl: './table-common.component.scss',
  providers: [
    FormatRolePipe,
    FormatDatePipe,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    FormatAccountStatusPipe,
    FormatDeviceStatusPipe,
  ], // Đăng kí thêm Pipe ở đây
  imports: [
    TableModule,
    CommonModule,
    InputGroupModule,
    IconFieldModule,
    InputTextModule,
    ReactiveFormsModule,
    PaginatorModule,
    InputIconModule,
    MenuModule,
    SkeletonModule,
  ],
  standalone: true,
})
export class TableCommonComponent implements OnInit, OnChanges {
  @ContentChild(TemplateRef) bodyTemplateRef!: TemplateRef<any>;

  @Input() configHeader: ITableHeaderConfig[] = [];
  @Input() data: any[] = [];
  @Input() title = '';
  @Input() titleTextSize = '1rem';

  @Input() virtualScroll = false;
  @Input() scrollHeight = '450px';

  @Input() showBtnSearch: boolean = false;
  @Input() showPagination: boolean = false;
  @Input() showActionButton: boolean = true;

  @Input() limitPerPage = 0;
  @Input() totalRecord = 0;
  @Input() activePage!: number;

  @Output() searchEvent = new EventEmitter();
  @Output() addEvent = new EventEmitter();
  @Output() pageChangeEvent = new EventEmitter();
  @Output() doubleClickRow = new EventEmitter();

  searchInput = new FormControl('');

  rowsPerPageOptions = rowsPerPageOptions;
  first = 0;

  constructor(private injector: Injector) {}

  transformData(value: any, pipeName: string, pipeArgs: any[]): any {
    let pipe: any;
    switch (pipeName) {
      case 'date':
        pipe = this.injector.get(FormatDatePipe);
        break;
      case 'currency':
        pipe = this.injector.get(CurrencyPipe);
        break;
      case 'decimal':
        pipe = this.injector.get(DecimalPipe);
        break;
      case 'vks-format-role': //Tạo mới một format mẫu: - case: 'vks-namePipe' -
        pipe = this.injector.get(FormatRolePipe); // Thêm Pipe tùy chỉnh vào đây
        break;
      case 'vks-format-account-status':
        pipe = this.injector.get(FormatAccountStatusPipe);
        break;
      case 'vks-format-device-status':
        pipe = this.injector.get(FormatDeviceStatusPipe);
        break;
      default:
        return value;
    }
    return pipe.transform(value, ...pipeArgs);
  }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => of(value))
      )
      .subscribe((res) => {
        this.searchEvent.emit(res);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.activePage) {
    //     if (changes.activePage.currentValue) {
    //         this.first = (changes.activePage.currentValue - 1) * this.limitPerPage
    //     } else {
    //         throw new Error('activePage must be greater than or equal to the 1')
    //     }
    // }
  }

  onPageChange(page: PaginatorState) {
    this.pageChangeEvent.emit(page);
  }

  onDoubleClick(item: any) {
    this.doubleClickRow.emit(item);
  }

  getScrollHeight(virtualScroll: boolean, data: any[]): string | undefined {
    if (virtualScroll && data && data.length) {
      // Return your desired scroll height here
      return this.scrollHeight;
    }
    // Return default scroll height or null if conditions are not met
    return undefined;
  }
}
