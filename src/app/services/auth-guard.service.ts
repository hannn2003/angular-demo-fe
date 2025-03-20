import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  MaybeAsync,
} from '@angular/router';

import { UserInfoService } from './user-info.service';
import { RoleAccount } from '@vks/app/shared/models';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private userInfoService: UserInfoService) {}

  canActivate(route: ActivatedRouteSnapshot): MaybeAsync<boolean> {
    const canView = route.data.roles as RoleAccount[];

    return this.userInfoService.roleAccount$.asObservable().pipe(
      switchMap((roleAccounts) => {
        return of(true);
        // if (!canView || !roleAccounts || !canView.includes(roleAccounts)) {
        //   return of(true);
        // } else {
        //   return of(true);
        // }
      })
    );
  }
}
