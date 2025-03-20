import { Component, OnInit } from '@angular/core';
import {
  collapseDiagramPageDefault,
  collapseDiagramPageSize,
  DataCollapseMapType,
  TITLE,
} from '../models';
import {
  DepartmentCode,
  ICategoryItem,
  IUserInfo,
} from '@vks/app/shared/models';
import {
  CategoryService,
  LoadingService,
  UserInfoService,
} from '@vks/app/services';
import { IGetListDiagram } from '@vks/app/https/diagram-management/interfaces';
import { SampleDiagramManagementHttpService } from '../sample-diagram-management-http.service';
import { finalize, takeUntil } from 'rxjs';
@Component({
  selector: 'vks-sample-diagram-management',
  templateUrl: './sample-diagram-management.component.html',
  styleUrl: './sample-diagram-management.component.scss',
})
export class SampleDiagramManagementComponent implements OnInit {
  readonly TITLE = TITLE;
  readonly pageSize = collapseDiagramPageSize;
  readonly pageDefault = collapseDiagramPageDefault;

  isVisibleCreateModal: boolean = false;
  userInfo: IUserInfo | null = null;
  totalEL: number = 8;
  first: number = 1;
  limit: number = 4;
  departmentList: ICategoryItem[] = [];
  textSearch: string = '';

  dataCollapse: DataCollapseMapType = {};
  constructor(
    private categoryService: CategoryService,
    private userInfoService: UserInfoService,
    private diagramManagementService: SampleDiagramManagementHttpService,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.userInfoService.userInfo$.subscribe((data) => {
      this.userInfo = data;
    });
    this.categoryService.getListCategories().subscribe((res) => {
      console.log(res);
      const displayDepartment = res?.departments.filter(
        (item) =>
          item.code !== DepartmentCode.PB_LANH_DAO &&
          item.code !== DepartmentCode.PB_KY_THUAT
      );
      if (
        displayDepartment &&
        this.userInfo?.departmentCode !== DepartmentCode.PB_KY_THUAT
      ) {
        this.departmentList = displayDepartment.filter(
          (item) => item.code === this.userInfo?.departmentCode
        );
      } else {
        this.departmentList = displayDepartment || [];
      }
      this.departmentList.forEach((item) => {
        if (item.code) {
          this.dataCollapse[item.code] = {
            list: [],
            currentActivePage: this.pageDefault,
            totalRecords: this.pageSize,
            totalPages: 1,
          };
        }
      });
    });
  }
  findDepartmentById(id: number) {
    return this.departmentList.find((item) => item.id === id);
  }
  handleGetDataCollapsed(data: { searchData: IGetListDiagram; page: number }) {
    // this.textSearch = data.searchData.textSearch
    // this.diagramManagementService
    //     .getListDiagrams(data.searchData, data.page, this.pageSize)
    //     .pipe(
    //         finalize(() => this.loadingService.showLoading(false)),
    //         takeUntil(this.destroyService),
    //     )
    //     .subscribe((response) => {
    //         const currentDepartment = this.findDepartmentById(data.searchData.departmentId)
    //         if (currentDepartment && currentDepartment.code) {
    //             const arrList = response.content.map((item) => ({
    //                 id: item.id,
    //                 name: item.name,
    //                 url: item.url ? item.url : '',
    //             }))
    //             this.dataCollapse[currentDepartment.code] = {
    //                 list: [...arrList],
    //                 currentActivePage: response.page * this.pageSize,
    //                 totalRecords: response.totalRecords,
    //                 totalPages: response.totalPages,
    //             }
    //         }
    //     })
  }
  onOpenCreate() {
    this.isVisibleCreateModal = true;
  }
  onCloseCreateModal() {
    this.isVisibleCreateModal = false;
  }
}
