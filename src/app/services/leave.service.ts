import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

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

  // Get all leave request
  getAllLeaveRequest(): Observable<any> {
    const url: string = `${this.baseUrl}/leave`;
    return this.http.get<any>(url)
      .pipe(
        map((resp: any)=>{
          return resp;
        })
      )
  }

/**
 * // Update user status to admin
  toggleIsAdmin(isAdmin: boolean, userId: string): Observable<any> {
    const url = `${environment.apiUrl}/user/patch-admin/${userId}`;
    return this.http.patch(url, { admin: isAdmin }).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }
 */


  // Approve Leave
  approveLeave(isApproved: boolean, userId: string): Observable<any> {
    const url = `${this.baseUrl}/leave/approve/${userId}`;
    return this.http.patch(url, {leaveStatus: isApproved}).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }
}
