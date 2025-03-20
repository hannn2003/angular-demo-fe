import { Injectable } from '@angular/core';
// import Cookies from 'js-cookie'
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IBaseResponse } from '@vks/app/https/base-response.interface';
import { ILoginFirstStep } from '@vks/app/shared/models';
import { APP_CONFIG } from '@vks/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${APP_CONFIG.baseUrl}`;
  loggedIn = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      const decodedToken = token; // decode token để lấy expire date
      // const isExpirationDate = true; //so sánh expire date với date hiện tại
      // expirationDate.setUTCSeconds(decodedToken.exp);

      // If the token has not expired, set user as logged in
      if (decodedToken) {
        this.loggedIn.next(true);
      } else {
        this.removeToken();
      }
    }
  }

  loginFirstStep(account: {
    username: string;
    password: string;
    currentDeviceId: string;
  }): Observable<IBaseResponse<ILoginFirstStep>> {
    return this.http.post<IBaseResponse<ILoginFirstStep>>(
      `${this.apiUrl}/api/v1/auth/authenticate`,
      account
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/auth/logout`);
  }

  // Cung cấp phương thức lấy token từ cookie
  getToken() {
    sessionStorage.setItem('token', 'token');
    return sessionStorage.getItem('token') as string;
  }

  // Cung cấp phương thức lưu token vào cookie
  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  removeToken() {
    this.loggedIn.next(false);
    sessionStorage.removeItem('token');
  }
}
