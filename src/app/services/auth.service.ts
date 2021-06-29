import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginRequestInterface } from "../interfaces/loginRequest.interface";
import { SignupRequestInterface } from "../interfaces/signupRequest.interface";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl: string = environment.apiUrl;
  private token: string;
  private userId: string;
  private isAuthenticated: boolean = false;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private profileUpdateStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  getToken() { return this.token; }
  getUserId() { return this.userId; }
  getIsAuth() { return this.isAuthenticated; }
  getAuthStatusListener() { return this.authStatusListener.asObservable(); }
  getprofileUpdateStatusListener() { return this.profileUpdateStatusListener.asObservable(); }

  registerUser(data: SignupRequestInterface): Observable<any> {
    return this.http
      .post<SignupRequestInterface>(this.baseUrl + '/signup', data)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
  }

  confirmAccount(token: string): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '/account-activate', { token })
      .pipe(
        map((resp) => {
          return resp;
        })
      )
  }

  loginUser(data: LoginRequestInterface): Observable<any> {
    return this.http
      .post<LoginRequestInterface>(this.baseUrl + '/login', data)
      .pipe(
        map((response: any) => {
          const token = response.token;
          this.token = token;
          if (token) {
            this.userId = response.userId;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);

            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);

            // token expiration date
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

            this.saveAuthData(token, expirationDate, this.userId); // save to local storage
            this.router.navigate(['/departments']);
            this.autoAuthUser();
            return response;
          }
        })
      )
  }

  // Getting profile info
  loggedInUserInfo(id: string): Observable<any> {
    return this.http
      .get(environment.apiUrl + `/user/${id}`);
  }

  // Update profile
  updateProfile(id: string, data): Observable<any> {
    return this.http.patch(environment.apiUrl + `/user/${id}`, data).pipe(
      map((response: any) => {
        this.profileUpdateStatusListener.next(true);
        return response;
      })
    );
  }

  // Update Password
  updatePassword(id: string, data): Observable<any> {
    return this.http.patch(environment.apiUrl + `/user/${id}/password`, data);
  }

  // Reset Password (Email Link)
  resetPassword(email: string): Observable<any> {
    return this.http.put(environment.apiUrl + "/user/forgot-password", email).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

  // Logout
  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.toastr.success("Logged out successfully.", 'Success');
  }

  // Auth timer
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000); //duration in milliseconds
  }

  // Save auth data in local storage
  private saveAuthData(token: string, expirationDate, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate);
    localStorage.setItem('userId', userId);
  }

  // clearAuth data from local storage
  private clearAuthData() {
    localStorage.clear();
  }

  // Auto login if user has already logged in (conditions applied)
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) { return }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
    this.router.navigate(['departments']);
  }

  // Get Auth Data from local storage
  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token && !expirationDate) { return }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}
