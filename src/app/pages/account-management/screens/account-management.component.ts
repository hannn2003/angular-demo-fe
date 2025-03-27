import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Router } from '@angular/router';
import {
  combineLatest,
  delay,
  finalize,
  firstValueFrom,
  takeUntil,
} from 'rxjs';

import {
  ConfigHeader,
  DefaultFilterData,
  FilterConfig,
  ListAccountActionConfig,
} from '@vks/app/pages/account-management/models';
// import { FilterFieldConfig } from '@vks/app/shared/ui-common/filter-common/filter-common.config'
import { AccountManagementHttpService } from '@vks/app/pages/account-management/account-management-http.service';
import {
  IAccountInfo,
  IFilterForm,
} from '@vks/app/https/account-management/interfaces';
import {
  DEFAULT_TABLE_PAGE,
  DEFAULT_TABLE_SIZE,
  ICategoryItem,
  IDropdownItem,
  KeyAction,
  KeyCategory,
  RoleAccount,
} from '@vks/app/shared/models';
import { ERoute } from '@vks/app/shared/layout/layout.model';
import { actionConfig } from '@vks/app/shared/ui-common/table-common/table.common.config';
import {
  CategoryService,
  LoadingService,
  UserInfoService,
} from '@vks/app/services';
import { IAccountForm } from '@vks/app/pages/account-management/models/interfaces';
import { FormatDatePipe } from '@vks/app/shared/pipe';

@Component({
  selector: 'vks-account-management',
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss',
  providers: [FormatDatePipe],
})
export class AccountManagementComponent implements OnInit {
  readonly title = 'Danh sách tài khoản';
  readonly filterConfig = FilterConfig;
  readonly configHeader = ConfigHeader;

  readonly KeyAction = KeyAction;

  defaultFilterData = DefaultFilterData;
  listAccount: IAccountInfo[] = [];
  totalRecords = 0;
  currentActivePage = 1;
  page = DEFAULT_TABLE_PAGE;
  pageSize = DEFAULT_TABLE_SIZE;
  actionConfig = [...ListAccountActionConfig];
  isVisibleModal = false;
  isEditMode = false;
  selectedAccount: IAccountInfo | null = null;
  rolesMap: { [key: number]: string } = {};
  listRoles: IDropdownItem[] = [];

  constructor(
    private accountManagementHttpService: AccountManagementHttpService,
    private loadingService: LoadingService,
    private router: Router,
    private userInfoServive: UserInfoService,
    private categoryService: CategoryService,
    private fomatDate: FormatDatePipe
  ) {}

  async ngOnInit() {
    combineLatest([
      this.userInfoServive.userInfo$,
      this.categoryService.listCategories$,
    ]).subscribe(([user, category]) => {
      if (!user || !category) return;
      const isAdmin = user.roleCode === RoleAccount.IT_ADMIN;
      const isVienTruong = user.roleCode === RoleAccount.VIEN_TRUONG;
      const isVienPho = user.roleCode === RoleAccount.VIEN_PHO;
      const isSuper = isAdmin || isVienTruong || isVienPho;
      this.filterConfig.map((config) => {
        if (config.name === 'roleId') {
          const allRole = category[KeyCategory.ROLE];
          const availableRoles = isSuper
            ? allRole
            : allRole.filter((item) =>
                [
                  RoleAccount.TRUONG_PHONG,
                  RoleAccount.PHO_PHONG,
                  RoleAccount.KIEM_SAT_VIEN,
                ].includes(item.code as RoleAccount)
              );
          config.options = this.handleUpdateFilterConfig(availableRoles);
        }
        if (config.name === 'departmentId') {
          const allDepartment = category[KeyCategory.DEPARTMENT];
          const userDepartment = allDepartment.find(
            (item) => item.code === user.departmentCode
          )!;
          const availableDepartment = isSuper
            ? allDepartment
            : [userDepartment];
          config.options = this.handleUpdateFilterConfig(availableDepartment);
        }
        if (config.name === 'organizationId') {
          config.options = this.handleUpdateFilterConfig(
            category[KeyCategory.ORGANIZATION]
          );
        }
      });
    });
    await Promise.all([
      this.handleGetAccountManagement(),
      this.handleGetRoleManagement(),
    ]);
    console.log('roles', this.rolesMap);
    this.actionConfig = this.actionConfig.map((action) => {
      if (action.key === KeyAction.UPDATE) {
        console.log('EDIT');
        return {
          ...action,
          command: (item: IAccountInfo) => this.onEdit(item),
        };
      }
      if (action.key === KeyAction.REMOVE) {
        console.log('REMOVE');
        return {
          ...action,
          command: (item: any) => {
            console.log(item.item.command);
            this.onDelete(item);
          },
        };
      }
      return action;
    });
  }

  isDisableRemoveButton(itemActionConfig: actionConfig): boolean {
    return itemActionConfig.key === KeyAction.REMOVE;
  }

  handleUpdateFilterConfig(arrCategory: ICategoryItem[]) {
    return (
      !!arrCategory &&
      arrCategory.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    );
  }

  onPageChange(page: PaginatorState) {
    // console.log('page', page)
    // this.page = page.page! + 1
    // this.pageSize = page.rows!
    // this.handleGetAccountManagement()
  }

  onSearch(data: any) {
    // console.log('Dữ liệu search', data)
    // this.defaultFilterData.fullName = data
    // this.handleGetAccountManagement()
  }

  onFilter(filter: IFilterForm) {
    // console.log('filter', filter)
    // const currentCategory = this.categoryService.listCategories$.getValue()
    // const findRole = currentCategory?.roles.find(({ id }) => filter.roleId === id)
    // const findDepartment = currentCategory?.departments.find(({ id }) => filter.departmentId === id)
    // const findOrganization = currentCategory?.organizations.find(({ id }) => filter.organizationId === id)
    // this.defaultFilterData = {
    //     username: filter.username,
    //     fullName: filter.fullName,
    //     departmentId: findDepartment?.id ?? 0,
    //     departmentName: findDepartment?.name ?? '',
    //     fromDate: filter.fromDate ? this.fomatDate.transform(filter.fromDate) : '',
    //     toDate: filter.toDate ? this.fomatDate.transform(filter.toDate) : '',
    //     organizationId: findOrganization?.id ?? 0,
    //     organizationName: findOrganization?.name ?? '',
    //     roleId: findRole?.id ?? 0,
    //     roleName: findRole?.name ?? '',
    //     status: filter.status,
    // }
    // this.page = 1
    // this.handleGetAccountManagement()
    // console.log(this.defaultFilterData)
  }

  onEdit(item: IAccountInfo) {
    if (!item?.id) return;
    this.isEditMode = true;
    this.selectedAccount = item;
    this.isVisibleModal = true;
  }

  onDelete(item: IAccountInfo) {
    this.selectedAccount = item;
    this.handleDeleteAccount(this.selectedAccount.id.toString());
  }

  onAction(item: IAccountInfo, itemMenu: actionConfig) {
    if (itemMenu.key === KeyAction.REMOVE) {
      return this.onDelete(item);
    }
    this.onEdit(item);
  }

  onOpenModal() {
    this.isEditMode = false;
    this.selectedAccount = null;
    this.isVisibleModal = true;
  }

  onCloseModal() {
    this.isVisibleModal = false;
  }

  onDoubleClickRow(item: IAccountInfo) {
    // void this.router.navigate([ERoute.ACCOUNT_MANAGEMENT + '/detail'], {
    //     queryParams: { accountId: item.id },
    // })
  }

  onSubmit(formData: IAccountForm) {
    if (this.isEditMode) return this.onEditSubmit(formData);
    this.onCreateSubmit(formData);
  }

  onCreateSubmit(formData: IAccountForm) {
    this.loadingService.showLoading(true);
    console.log('OK');
    this.accountManagementHttpService
      .createAccount({
        ...formData,
        departmentId: 1,
        organizationId: 1,
      })
      .pipe(finalize(() => this.loadingService.showLoading(false)))
      .subscribe({
        next: () => {
          this.isVisibleModal = false;
          this.handleGetAccountManagement();
        },
        error: (error) => {
          console.error('Tạo tài khoản thất bại:', error);
        },
      });
  }

  onEditSubmit(formData: IAccountForm) {
    console.log('formData', formData);
    this.loadingService.showLoading(true);
    console.log('OK');
    console.log('selectedAccount', this.selectedAccount);
    this.accountManagementHttpService
      .editAccount(this.selectedAccount?.id as any, {
        ...formData,
        departmentId: 1,
        organizationId: 1,
      })
      .pipe(finalize(() => this.loadingService.showLoading(false)))
      .subscribe({
        next: () => {
          this.isVisibleModal = false;
          this.handleGetAccountManagement();
        },
        error: (error) => {
          console.error('Tạo tài khoản thất bại:', error);
        },
      });
  }

  handleGetAccountManagement() {
    this.loadingService.showLoading(true);
    this.accountManagementHttpService
      .getListAccountManagement(
        this.defaultFilterData,
        this.pageSize,
        this.page
      )
      .pipe(
        delay(2000),
        finalize(() => this.loadingService.showLoading(false))
      )
      .subscribe((listData) => {
        if (Array.isArray(listData) && listData.length > 0) {
          this.listAccount = listData.map((account) => ({
            ...account,
            roleName: this.rolesMap[account.roleId] || '',
          }));
        } else {
          this.listAccount = [];
          console.warn('No accounts found.');
        }
      });
  }

  async handleGetRoleManagement() {
    const roles = await firstValueFrom(
      this.accountManagementHttpService.getRoles()
    );
    this.rolesMap = roles.reduce((acc: any, role: any) => {
      acc[role.id] = role.name;
      return acc;
    }, {});

    this.listRoles = roles.map((role: any) => ({
      label: role.name,
      value: role.id,
    }));
  }

  handleDeleteAccount(accountId: string) {
    this.accountManagementHttpService.deleteAccount(accountId).subscribe({
      next: () => {
        this.handleGetAccountManagement();
      },
      error: (e) => console.log(e),
    });
  }

  getRoleNameById(roleId: number | undefined): string {
    if (roleId === undefined) {
      return 'Unknown';
    }

    const role = this.listRoles.find((role) => role.value === roleId);
    return role ? role.label : 'Unknown';
  }
}
