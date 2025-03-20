import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, retry, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ICategory } from '@vks/app/shared/models';
import { CategoryApiService } from '@vks/app/https/category/category-api.service';
import { IBaseResponse } from '../https/base-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  listCategories$ = new BehaviorSubject<ICategory | null>(null);

  constructor(private categoryApiService: CategoryApiService) {}

  getCategories() {
    return this.categoryApiService
      .getCategories<IBaseResponse<ICategory>>()
      .pipe(
        retry(2),
        switchMap((response) => {
          console.log(response);
          this.listCategories$.next(response.result);
          return EMPTY;
        }),
        catchError(() => throwError(() => new Error('Category not found')))
      );
  }

  getListCategories() {
    return this.listCategories$.asObservable();
  }
}
