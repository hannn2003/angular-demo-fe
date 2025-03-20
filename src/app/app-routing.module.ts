import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { EActiveStatus } from './shared/layout/layout.model';
import { RoleAccount } from './shared/models';
import { AuthGuardService } from './services';
import { LoginComponent } from './pages/login/login.component';
export const rootRoute = 'vks';
export const PageActiveByRole = {
  [EActiveStatus.DASHBOARD]: [
    RoleAccount.TRUONG_PHONG,
    RoleAccount.KIEM_SAT_VIEN,
    RoleAccount.PHO_PHONG,
    RoleAccount.VIEN_TRUONG,
    RoleAccount.VIEN_PHO,
  ],
  [EActiveStatus.ACCOUNT_MANAGEMENT]: [
    RoleAccount.TRUONG_PHONG,
    RoleAccount.IT_ADMIN,
    RoleAccount.PHO_PHONG,
    RoleAccount.VIEN_TRUONG,
    RoleAccount.VIEN_PHO,
  ],
  [EActiveStatus.UNIT_MANAGEMENT]: [
    RoleAccount.TRUONG_PHONG,
    RoleAccount.IT_ADMIN,
    RoleAccount.PHO_PHONG,
    RoleAccount.VIEN_TRUONG,
    RoleAccount.VIEN_PHO,
  ],
  [EActiveStatus.SAMPLE_DIAGRAM_MANAGEMENT]: [
    RoleAccount.TRUONG_PHONG,
    RoleAccount.PHO_PHONG,
    RoleAccount.VIEN_TRUONG,
    RoleAccount.VIEN_PHO,
    RoleAccount.IT_ADMIN,
  ],
  [EActiveStatus.CASE_MANAGEMENT]: [
    RoleAccount.TRUONG_PHONG,
    RoleAccount.PHO_PHONG,
    RoleAccount.VIEN_TRUONG,
    RoleAccount.VIEN_PHO,
    RoleAccount.KIEM_SAT_VIEN,
    RoleAccount.IT_ADMIN,
  ],
  [EActiveStatus.DEPARTMENT_MANAGEMENT]: [
    RoleAccount.TRUONG_PHONG,
    RoleAccount.PHO_PHONG,
    RoleAccount.VIEN_TRUONG,
    RoleAccount.VIEN_PHO,
    RoleAccount.IT_ADMIN,
  ],
  [EActiveStatus.STATUS_MANAGEMENT]: [
    RoleAccount.TRUONG_PHONG,
    RoleAccount.PHO_PHONG,
    RoleAccount.VIEN_TRUONG,
    RoleAccount.VIEN_PHO,
    RoleAccount.IT_ADMIN,
    RoleAccount.KIEM_SAT_VIEN,
  ],
  [EActiveStatus.DEVICE_MANAGEMENT]: [RoleAccount.IT_ADMIN],
  [EActiveStatus.USB_MANAGEMENT]: [RoleAccount.IT_ADMIN],
  [EActiveStatus.PROFILE_MANAGEMENT]: [
    RoleAccount.TRUONG_PHONG,
    RoleAccount.PHO_PHONG,
    RoleAccount.VIEN_TRUONG,
    RoleAccount.VIEN_PHO,
    RoleAccount.IT_ADMIN,
    RoleAccount.KIEM_SAT_VIEN,
  ],
  [EActiveStatus.SYSTEM_HISTORY_MANAGEMENT]: [
    RoleAccount.IT_ADMIN,
    RoleAccount.VIEN_TRUONG,
    RoleAccount.VIEN_PHO,
  ],
};
const routes: Routes = [
  {
    path: '',
    redirectTo: 'vks/dashboard',
    pathMatch: 'full',
  },
  {
    path: rootRoute,
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: { roles: PageActiveByRole[EActiveStatus.DASHBOARD] },
        // canActivate: [AuthGuardService],
      },
      {
        path: 'account-management',
        loadChildren: () =>
          import(
            '@vks/app/pages/account-management/account-management.module'
          ).then((m) => m.AccountManagementModule),
        data: { roles: PageActiveByRole[EActiveStatus.ACCOUNT_MANAGEMENT] },
        canActivate: [AuthGuardService],
      },
      {
        path: 'sample-diagram-management',
        loadChildren: () =>
          import(
            '@vks/app/pages/sample-diagram-management/sample-diagram-management.module'
          ).then((m) => m.SampleDiagramManagementModule),
        data: {
          roles: PageActiveByRole[EActiveStatus.SAMPLE_DIAGRAM_MANAGEMENT],
        },
        canActivate: [AuthGuardService],
      },
      {
        path: 'unit-management',
        loadChildren: () =>
          import('@vks/app/pages/unit-management/unit-management.module').then(
            (m) => m.UnitManagementModule
          ),
        data: { roles: PageActiveByRole[EActiveStatus.UNIT_MANAGEMENT] },
        canActivate: [AuthGuardService],
      },
      {
        path: 'case-management',
        loadChildren: () =>
          import('@vks/app/pages/case-management/case-management.module').then(
            (m) => m.CaseManagementModule
          ),
        data: { roles: PageActiveByRole[EActiveStatus.CASE_MANAGEMENT] },
        canActivate: [AuthGuardService],
      },
      {
        path: 'department-management',
        loadChildren: () =>
          import(
            '@vks/app/pages/department-management/department-management.module'
          ).then((m) => m.DepartmentManagementModule),
        data: { roles: PageActiveByRole[EActiveStatus.DEPARTMENT_MANAGEMENT] },
        canActivate: [AuthGuardService],
      },
      {
        path: 'status-management',
        loadChildren: () =>
          import(
            '@vks/app/pages/status-management/status-management.module'
          ).then((m) => m.StatusManagementModule),
        data: { roles: PageActiveByRole[EActiveStatus.STATUS_MANAGEMENT] },
        canActivate: [AuthGuardService],
      },
      {
        path: 'device-management',
        loadChildren: () =>
          import(
            '@vks/app/pages/device-management/device-management.module'
          ).then((m) => m.DeviceManagementModule),
        data: { roles: PageActiveByRole[EActiveStatus.DEVICE_MANAGEMENT] },
        canActivate: [AuthGuardService],
      },
      {
        path: 'usb-management',
        loadChildren: () =>
          import(
            '@vks/app/pages/device-management/device-management.module'
          ).then((m) => m.DeviceManagementModule),
        data: { roles: PageActiveByRole[EActiveStatus.DEVICE_MANAGEMENT] },
        canActivate: [AuthGuardService],
      },
      {
        path: 'system-history-management',
        loadChildren: () =>
          import(
            '@vks/app/pages/history-management/history-management.module'
          ).then((m) => m.HistoryManagementModule),
      },
    ],
  },
  { path: '**', redirectTo: 'vks/dashboard' }, // Xử lý lỗi 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
