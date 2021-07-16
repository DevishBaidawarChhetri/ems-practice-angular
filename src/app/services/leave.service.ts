import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class LeaveService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ){}

  // Request Leave (POST)
  requestLeave(body): Observable<any> {
    const url: string = `${this.baseUrl}/leave`;
    return this.http.post<any>(url, body)
      .pipe(
        map((resp: any)=>{
          return resp;
        })
      )
  }

  // Get Self leave request
  getSelfLeaveRequest(): Observable<any> {
    const url: string = `${this.baseUrl}/leave/myrequest`;
    return this.http.get<any>(url)
      .pipe(
        map((resp: any)=>{
          return resp;
        })
      )
  }

  // Delete leave request
  deleteSelfLeaveRequest(id): Observable<any> {
    const url: string = `${this.baseUrl}/leave/delete/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      )
  }
}
