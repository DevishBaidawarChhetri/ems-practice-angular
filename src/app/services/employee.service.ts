import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../interfaces/employee';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseURL: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    const employeeUrl: string = `${this.baseURL}/employees`;
    return this.http
      .get<Employee[]>(employeeUrl)
      .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id: Employee): Observable<Employee> {
    const deleteUrl = `${this.baseURL}/employee/` + id;
    return this.http
      .delete<Employee>(deleteUrl)
      .pipe(catchError(this.errorHandler));
  }

  addEmployee(employeeData: Employee): Observable<Employee> {
    const addEmployeeUrl = `${this.baseURL}/employee`;
    return this.http
      .post<Employee>(addEmployeeUrl, employeeData)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
