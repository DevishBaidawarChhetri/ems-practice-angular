import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseURL: string = environment.apiUrl;
  private empUpdateStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getEmpUpdateStatusListener() { return this.empUpdateStatusListener.asObservable(); }

  getEmployees(): Observable<any> {
    const employeeUrl: string = `${this.baseURL}/employee`;
    return this.http
      .get<Employee[]>(employeeUrl)
      .pipe(catchError(this.errorHandler));
  }

  // get employees with pagination
  getEmployeesWithPagination(currentPage: number, postsPerPage: number): Observable<any> {
    const employeesUrl: string = `${this.baseURL}/employee`;
    const queryParams = `?currentPage=${currentPage}&pageSize=${postsPerPage}`;
    return this.http
      .get<any>(employeesUrl + queryParams)
      .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id: Employee): Observable<any> {
    const deleteUrl = `${this.baseURL}/employee/` + id;
    return this.http
      .delete<Employee>(deleteUrl)
      .pipe(catchError(this.errorHandler));
  }

  addEmployee(employeeData: Employee): Observable<any> {
    const addEmployeeUrl = `${this.baseURL}/employee`;
    return this.http
      .post<Employee>(addEmployeeUrl, employeeData)
      .pipe(catchError(this.errorHandler));
  }

  updateDepartment(id: string, data): Observable<any> {
    const updateUrl: string = `${this.baseURL}/employee/${id}`;
    return this.http
      .put(updateUrl, data)
      .pipe(
        map((resp) => {
          this.empUpdateStatusListener.next(true);
          return resp;
        }),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
