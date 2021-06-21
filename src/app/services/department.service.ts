import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Department } from '../interfaces/department';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  baseURL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    const departmentUrl: string = `${this.baseURL}/api/departments`;
    return this.http
      .get<Department[]>(departmentUrl)
      .pipe(catchError(this.errorHandler));
  }

  addDepartment(departmentData: Department): Observable<Department> {
    const addDepartmentUrl: string = `${this.baseURL}/api/department`;
    return this.http
      .post<Department>(addDepartmentUrl, departmentData)
      .pipe(catchError(this.errorHandler));
  }

  deleteDepartment(departmentData: Department): Observable<Department> {
    const deleteUrl = `${this.baseURL}/api/department/` + departmentData;
    return this.http
      .delete<Department>(deleteUrl)
      .pipe(catchError(this.errorHandler));
  }

  updateDepartment(departmentData) {
    const updateUrl: string = `${this.baseURL}/api/department/${departmentData._id}`;
    console.log(updateUrl);
    return this.http
      .put(updateUrl, departmentData)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
