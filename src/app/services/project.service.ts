import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Department } from '../interfaces/department';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseURL: string = environment.apiUrl;
  private projectUpdateStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getProjectUpdateStatusListener() { return this.projectUpdateStatusListener.asObservable(); }

  getProjects(): Observable<any> {
    const departmentUrl: string = `${this.baseURL}/project`;
    return this.http
      .get<Department[]>(departmentUrl)
      .pipe(catchError(this.errorHandler));
  }

  // get department with pagination
  getProjectsWithPagination(currentPage: number, postsPerPage: number): Observable<any> {
    const departmentUrl: string = `${this.baseURL}/project`;
    const queryParams = `?currentPage=${currentPage}&pageSize=${postsPerPage}`;
    return this.http
      .get<any>(departmentUrl + queryParams)
      .pipe(catchError(this.errorHandler));
  }

  addProject(data): Observable<any> {
    const url: string = `${this.baseURL}/project`;
    return this.http
      .post<any>(url, data)
      .pipe(catchError(this.errorHandler));
  }

  deleteProject(id: string): Observable<any> {
    const deleteUrl = `${this.baseURL}/project/` + id;
    return this.http
      .delete<Department>(deleteUrl)
      .pipe(catchError(this.errorHandler));
  }

  updateProject(id: string, data): Observable<any> {
    const updateUrl: string = `${this.baseURL}/project/${id}`;
    return this.http
      .put(updateUrl, data)
      .pipe(
        map((resp) => {
          this.projectUpdateStatusListener.next(true);
          return resp;
        }),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
