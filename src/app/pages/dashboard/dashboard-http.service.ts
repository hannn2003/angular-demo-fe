import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG } from "@vks/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class DashboardHttpService {

  baseUrl = `${APP_CONFIG.baseUrl}/fakeapi`;
  constructor(
    private http: HttpClient
  ) { }

  getFakeAccountFromJsonServer() {
    return this.http.get(this.baseUrl) as Observable<any>;
  }
}
