import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimelogService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  postTimelog(data): Observable<any> {
    const url: string = `${this.baseUrl}/timelog`;
    return this.http.post<any>(url, data)
      .pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }
}
