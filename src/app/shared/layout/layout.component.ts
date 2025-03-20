import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  forkJoin,
  of,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';

import {
  EActiveStatus,
  ERoute,
  MenuItemModel,
  ProfileItemModel,
} from './layout.model';
import { DepartmentCode, MODE, RoleAccount } from '@vks/app/shared/models';
import { AuthService, UserInfoService } from '@vks/app/services';
import { FormatRolePipe } from '@vks/app/shared/pipe/format-role.pipe';
import { PageActiveByRole } from '@vks/app/app-routing.module';
import { CategoryService } from '@vks/app/services/category.service';
import { LoadingService } from '@vks/app/services/loading.service';
import { APP_CONFIG } from '@vks/environments/environment';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'vks-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    SidebarModule,
    AvatarGroupModule,
    AvatarModule,
    MenuModule,
    ButtonModule,
    RippleModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    CardModule,
    InputSwitchModule,
    FormatRolePipe,
    CommonModule,
  ],
})
export class LayoutComponent implements OnInit, OnDestroy {
  readonly RoleAccount = RoleAccount;

  eventAndUserInfo: Subscription;
  currentActive = EActiveStatus.DASHBOARD;
  currentRole!: RoleAccount;
  isOnlineMode: boolean = true;
  isLoadingScreen = false;

  // //TODO: Remove when unused url-bar
  currentUrl = '';
  url$ = new BehaviorSubject('');

  userInfo$ = this.userInfoService.userInfo$.asObservable();

  menuItemsConfig: MenuItemModel[] = [
    {
      label: 'Thống kê',
      icon: 'pi pi-home',
      activeStatus: EActiveStatus.DASHBOARD,
      canView: PageActiveByRole[EActiveStatus.DASHBOARD],
      action: () =>
        this.changeCurrentActive(EActiveStatus.DASHBOARD, ERoute.DASHBOARD),
    },
    {
      label: 'Quản lý tài khoản',
      icon: 'pi pi-id-card',
      activeStatus: EActiveStatus.ACCOUNT_MANAGEMENT,
      canView: PageActiveByRole[EActiveStatus.ACCOUNT_MANAGEMENT],
      action: () =>
        this.changeCurrentActive(
          EActiveStatus.ACCOUNT_MANAGEMENT,
          ERoute.ACCOUNT_MANAGEMENT
        ),
    },
    {
      label: 'Quản lý đơn vị',
      icon: 'pi pi-building',
      activeStatus: EActiveStatus.UNIT_MANAGEMENT,
      canView: PageActiveByRole[EActiveStatus.UNIT_MANAGEMENT],
      action: () =>
        this.changeCurrentActive(
          EActiveStatus.UNIT_MANAGEMENT,
          ERoute.UNIT_MANAGEMENT
        ),
    },
    {
      label: 'Quản lý sơ đồ mẫu',
      icon: 'pi pi-sitemap',
      activeStatus: EActiveStatus.SAMPLE_DIAGRAM_MANAGEMENT,
      canView: PageActiveByRole[EActiveStatus.SAMPLE_DIAGRAM_MANAGEMENT],
      action: () =>
        this.changeCurrentActive(
          EActiveStatus.SAMPLE_DIAGRAM_MANAGEMENT,
          ERoute.SAMPLE_DIAGRAM_MANAGEMENT
        ),
    },
    {
      label: 'Quản lý vụ án',
      icon: 'pi pi-folder-open',
      activeStatus: EActiveStatus.CASE_MANAGEMENT,
      canView: PageActiveByRole[EActiveStatus.CASE_MANAGEMENT],
      action: () =>
        this.changeCurrentActive(
          EActiveStatus.CASE_MANAGEMENT,
          ERoute.CASE_MANAGEMENT
        ),
    },
    {
      label: 'Quản lý phòng ban',
      icon: 'pi pi-building-columns',
      activeStatus: EActiveStatus.DEPARTMENT_MANAGEMENT,
      canView: PageActiveByRole[EActiveStatus.DEPARTMENT_MANAGEMENT],
      action: () =>
        this.changeCurrentActive(
          EActiveStatus.DEPARTMENT_MANAGEMENT,
          ERoute.DEPARTMENT_MANAGEMENT
        ),
    },
    {
      label: 'Quản lý trạng thái',
      icon: 'pi pi-address-book',
      activeStatus: EActiveStatus.STATUS_MANAGEMENT,
      canView: PageActiveByRole[EActiveStatus.STATUS_MANAGEMENT],
      action: () =>
        this.changeCurrentActive(
          EActiveStatus.STATUS_MANAGEMENT,
          ERoute.STATUS_MANAGEMENT
        ),
    },
    {
      label: 'Quản lý thiết bị',
      activeStatus: EActiveStatus.DEVICE_MANAGEMENT,
      icon: 'pi pi-desktop',
      canView: PageActiveByRole[EActiveStatus.DEVICE_MANAGEMENT],
      action: () =>
        this.changeCurrentActive(
          EActiveStatus.DEVICE_MANAGEMENT,
          ERoute.DEVICE_MANAGEMENT
        ),
    },
    {
      label: 'Quản lý USB',
      activeStatus: EActiveStatus.USB_MANAGEMENT,
      icon: 'pi pi-eject',
      canView: PageActiveByRole[EActiveStatus.USB_MANAGEMENT],
      action: () =>
        this.changeCurrentActive(
          EActiveStatus.USB_MANAGEMENT,
          ERoute.USB_MANAGEMENT
        ),
    },
    {
      label: 'Quản lý lịch sử hệ thống',
      activeStatus: EActiveStatus.SYSTEM_HISTORY_MANAGEMENT,
      icon: 'pi pi-clock',
      canView: PageActiveByRole[EActiveStatus.SYSTEM_HISTORY_MANAGEMENT],
      action: () =>
        this.changeCurrentActive(
          EActiveStatus.SYSTEM_HISTORY_MANAGEMENT,
          ERoute.SYSTEM_HISTORY_MANAGEMENT
        ),
    },
  ];
  ProfileConfig: ProfileItemModel[] = [
    {
      activeStatus: EActiveStatus.PROFILE_MANAGEMENT,
      canView: PageActiveByRole[EActiveStatus.PROFILE_MANAGEMENT],
      action: () =>
        this.changeCurrentActive(
          EActiveStatus.PROFILE_MANAGEMENT,
          ERoute.PROFILE_MANAGEMENT
        ),
    },
  ];

  APP_CONFIG = APP_CONFIG;

  constructor(
    private router: Router,

    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private loadingService: LoadingService,
    private categoryService: CategoryService,
    private userInfoService: UserInfoService,
    private route: ActivatedRoute
  ) {
    this.eventAndUserInfo = combineLatest([
      this.router.events,
      this.userInfoService.roleAccount$.asObservable(),
    ])
      .pipe(
        switchMap(([newEvent, roleCode]) => {
          const routerEvent = (newEvent as Scroll).routerEvent;
          const hasUserInfoWhileNavigating =
            roleCode && routerEvent instanceof NavigationEnd;
          if (!hasUserInfoWhileNavigating) return of([]);
          this.currentRole = roleCode;
          const currentMenu = this.mapMenuItemUserCanView(roleCode);
          this.menuItemsConfig = [...currentMenu];
          const isIncluded = (roleList: RoleAccount[]) =>
            roleList.includes(roleCode);
          const isMatched = (activeStatus: EActiveStatus) =>
            this.router.url.startsWith(activeStatus);
          const isRouteAvailable = currentMenu.some(
            (item) => isIncluded(item.canView) && isMatched(item.activeStatus)
          );
          if (
            !isRouteAvailable &&
            this.router.url !== '/vien-kiem-sat/profile-management'
          ) {
            // navigate to default route
            const defaultRoute = currentMenu[0].activeStatus;
            this.url$.next(defaultRoute);
            this.currentActive = defaultRoute;
            void this.router.navigate([defaultRoute]);
          } else {
            // forward
            this.url$.next(this.router.url);
            this.currentActive = this.router.url as EActiveStatus;
            void this.router.navigateByUrl(this.router.url);
          }
          return of(currentMenu);
        })
        // takeUntil(this.destroyService)
      )
      .subscribe();
    // this.url$.pipe(takeUntil(this.destroyService)).subscribe((res) => {
    //   this.currentUrl = res;
    // });
  }

  ngOnInit() {
    // const isModeOnline =
    //   this.route.snapshot.queryParams['isModeOnline'] === MODE.ONLINE ||
    //   this.route.snapshot.queryParams['isModeOnline'] === undefined;
    // this.isOnlineMode = isModeOnline;
    // if (isModeOnline) {
    //   forkJoin([
    //     this.userInfoService.getUserInfo(),
    //     this.categoryService.getCategories(),
    //   ]).subscribe((res) => {
    //     this.userInfoService.setUserInfo(res[0]);
    //   });
    // } else {
    //   this.changeCurrentActive(
    //     EActiveStatus.CASE_MANAGEMENT,
    //     ERoute.CASE_MANAGEMENT
    //   );
    //   this.userInfoService.setUserInfo({
    //     departmentCode: DepartmentCode.PB_AN_NINH_MA_TUY,
    //     fullName: 'Người dùng',
    //     avatar: '',
    //     gender: 'MALE',
    //     isConditionLogin1: true,
    //     isConditionLogin2: true,
    //     isCreateCase: true,
    //     phoneNumber: 'string',
    //     roleCode: RoleAccount.VIEN_TRUONG,
    //     organizationName: 'string',
    //   });
    // }
    // this.loadingService.getIsLoading().subscribe((status) => {
    //   this.isLoadingScreen = status;
    //   this.cdRef.detectChanges();
    // });
    // this.electronService.detachAppUsb().on('logout', (event, isLogout) => {
    //     if (isLogout.logout) {
    //         this.onLogOut()
    //         this.menuItemsConfig = []
    //     }
    // })
  }

  changeCurrentActive(status: EActiveStatus, path: ERoute) {
    this.url$.next(path);
    this.currentActive = status;
    void this.router.navigate([path]);
    console.log(path);
  }

  mapMenuItemUserCanView(role: RoleAccount): MenuItemModel[] {
    return this.menuItemsConfig.filter((menuItem: MenuItemModel) => {
      return menuItem.canView.includes(role);
    });
  }

  get nameSwitchMode() {
    return this.isOnlineMode ? 'TRỰC TUYẾN' : 'NGOẠI TUYẾN';
  }

  //TODO: Remove when unused url-bar
  onEnterInputUrl(event: Event) {
    // const inputValue = (event.target as HTMLInputElement).value;
    // void this.router.navigateByUrl(inputValue);
  }

  onLogOut(): void {
    // if (this.isOnlineMode) {
    //   this.authService
    //     .logout()
    //     .pipe(
    //       switchMap(() => {
    //         this.navigateToLoginPage();
    //         return EMPTY;
    //       })
    //     )
    //     .subscribe();
    // } else {
    //   this.navigateToLoginPage();
    // }
  }

  onProfile(): void {
    void this.router.navigate(['vien-kiem-sat/profile-management']);
  }

  onChangeMode(): void {
    // this.onLogOut();
  }

  navigateToLoginPage() {
    // this.userInfoService.setUserInfo(null);
    // this.userInfoService.userInfo$.next(null);
    // this.userInfoService.roleAccount$.next(null);
    // this.authService.removeToken();
    // this.eventAndUserInfo.unsubscribe();
  }
  ngOnDestroy(): void {}
}
