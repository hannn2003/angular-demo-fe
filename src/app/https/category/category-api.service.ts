import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { APP_CONFIG } from '@vks/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class CategoryApiService {
    endpoint = `${APP_CONFIG.baseUrl}/api/v1/private/categories`

    constructor(private http: HttpClient) {}

    getCategories<T>() {
        return this.http.get(this.endpoint) as Observable<T>
    }
}
