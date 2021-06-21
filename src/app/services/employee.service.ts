import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseURL: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    const employeeUrl: string = `${this.baseURL}/api/employees`;
    return this.http
      .get<Employee[]>(employeeUrl)
      .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id: Employee): Observable<Employee> {
    const deleteUrl = `${this.baseURL}/api/employee/` + id;
    return this.http
      .delete<Employee>(deleteUrl)
      .pipe(catchError(this.errorHandler));
  }

  addEmployee(employeeData: Employee): Observable<Employee> {
    const addEmployeeUrl = `${this.baseURL}/api/employee`;
    return this.http
      .post<Employee>(addEmployeeUrl, employeeData)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
