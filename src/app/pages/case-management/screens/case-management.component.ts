import { Component, OnInit } from '@angular/core';
import { CaseManagementHttpService } from '../case-management-http.service';
import { DEFAULT_TABLE_PAGE, DEFAULT_TABLE_SIZE } from '@vks/app/shared/models';
import {
  ConfigHeaderCase,
  DefaultFilterDataCase,
  FilterConfigCase,
} from '../models/constants';
import { LoadingService } from '@vks/app/services';
import { delay, finalize, takeUntil } from 'rxjs';
import { ICaseResponse } from '@vks/app/https/case-management/interface.ts';

@Component({
  selector: 'vks-case-management',
  templateUrl: './case-management.component.html',
  styleUrl: './case-management.component.scss',
})
export class CaseManagementComponent implements OnInit {
  readonly title = 'Danh sách vụ án';
  readonly filterConfigCase = FilterConfigCase;
  readonly configHeaderCase = ConfigHeaderCase;
  page = DEFAULT_TABLE_PAGE;
  pageSize = DEFAULT_TABLE_SIZE;
  defaultFilterDataCase = DefaultFilterDataCase;
  listCase: ICaseResponse[] = [];
  totalRecord: number = 0;
  constructor(
    private caseManagementHttpService: CaseManagementHttpService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.handleGetCaseManagement();
  }

  onFilter(filter: any) {
    console.log(filter);
  }
  handleGetCaseManagement() {
    // this.loadingService.showLoading(true)
    // this.caseManagementHttpService
    //     .getListCaseManagement(this.defaultFilterDataCase, this.pageSize, this.page)
    //     .pipe(
    //         delay(2000),
    //         finalize(() => this.loadingService.showLoading(false)),
    //         takeUntil(this.destroyService),
    //     )
    //     .subscribe((listData) => {
    //         console.log(listData)
    //         this.listCase = listData.result.content
    //         this.totalRecord = listData.result.totalRecords
    //     })
  }
}
