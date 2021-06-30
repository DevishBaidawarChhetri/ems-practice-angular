import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Department } from '../interfaces/department';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  baseURL: string = environment.apiUrl;
  private deptUpdateStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getDeptUpdateStatusListener() { return this.deptUpdateStatusListener.asObservable(); }

  getDepartments(): Observable<any> {
    const departmentUrl: string = `${this.baseURL}/departments`;
    return this.http
      .get<Department[]>(departmentUrl)
      .pipe(catchError(this.errorHandler));
  }

  // get department with pagination
  getDepartmentWithPagination(currentPage: number, postsPerPage: number): Observable<any> {
    const departmentUrl: string = `${this.baseURL}/departments`;
    const queryParams = `?currentPage=${currentPage}&pageSize=${postsPerPage}`;
    return this.http
      .get<any>(departmentUrl + queryParams)
      .pipe(catchError(this.errorHandler));
  }

  addDepartment(departmentData: Department): Observable<any> {
    const addDepartmentUrl: string = `${this.baseURL}/department`;
    return this.http
      .post<Department>(addDepartmentUrl, departmentData)
      .pipe(catchError(this.errorHandler));
  }

  deleteDepartment(id: string): Observable<any> {
    const deleteUrl = `${this.baseURL}/department/` + id;
    return this.http
      .delete<Department>(deleteUrl)
      .pipe(catchError(this.errorHandler));
  }

  updateDepartment(id: string, data): Observable<any> {
    const updateUrl: string = `${this.baseURL}/department/${id}`;
    return this.http
      .put(updateUrl, data)
      .pipe(
        map((resp) => {
          this.deptUpdateStatusListener.next(true);
          return resp;
        }),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
