import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }
}
