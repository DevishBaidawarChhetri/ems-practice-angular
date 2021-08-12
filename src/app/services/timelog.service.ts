import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TimelogService {
  baseUrl: string = environment.apiUrl;
  private postAddStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getPostAddStatusListener() { return this.postAddStatusListener.asObservable(); }

  postTimelog(data): Observable<any> {
    const url: string = `${this.baseUrl}/timelog`;
    return this.http.post<any>(url, data)
      .pipe(
        map((resp: any) => {
          this.postAddStatusListener.next(true);
          return resp;
        }),
        catchError(this.errorHandler)
      )
  }

  // Get Self Time log
  getSelfTimelog(date): Observable<any> {
    const url: string = `${this.baseUrl}/timelog/mylog?date=${date}`;
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  // Delete Time Log
  deleteTimeLog(id): Observable<any> {
    const url: string = `${this.baseUrl}/timelog/${id}`;
    return this.http.delete(url).pipe(catchError(this.errorHandler));
  }

  // Update time log
  updateTimeLog(id, data): Observable<any> {
    const url: string = `${this.baseUrl}/timelog/${id}`;
    return this.http.patch(url, data)
      .pipe(
        map((resp: any) => {
          this.postAddStatusListener.next(true);
          return resp;
        }),
        catchError(this.errorHandler)
      )
  }

  // GET week's timelog of user
  getWeeksLog(id: string, startdate: string, enddate: string): Observable<any> {
    const url: string = `${this.baseUrl}/timelog/weekly-log/${id}`;
    const params: string = `?startdate=${startdate}&enddate=${enddate}`;
    return this.http.get(url + params)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }
}
