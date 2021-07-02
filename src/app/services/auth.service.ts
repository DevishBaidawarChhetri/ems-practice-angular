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
  private isAdmin: boolean = false;
  private isAdminStatusListener = new Subject<boolean>();

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
  getIsAdmin() { return this.isAdmin; }
  getIsAdminStatusListener() { return this.isAdminStatusListener.asObservable(); }

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
          if (response.isAdmin === true) {
            this.isAdmin = true;
            this.isAdminStatusListener.next(true);
          } else {
            this.isAdmin = false;
            this.isAdminStatusListener.next(false);
          }
          const token = response.token;
          this.token = token;
          if (token) {
            this.userId = response.userId;
            // this.isAdmin = response.isAdmin;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);

            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);

            // token expiration date
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

            this.saveAuthData(token, expirationDate, this.userId, this.isAdmin); // save to local storage
            this.router.navigate(['/registered-users']);
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

  // Getting all users
  getAllRegisteredUsers(): Observable<any> {
    return this.http
      .get(environment.apiUrl + "/users").pipe(
        map((resp: any) => {
          return resp;
        })
      )
  }

  // get all registered users with pagination
  getEmployeesWithPagination(currentPage: number, postsPerPage: number): Observable<any> {
    const usersUrl: string = `${environment.apiUrl}/users`;
    const queryParams = `?currentPage=${currentPage}&pageSize=${postsPerPage}`;
    return this.http
      .get<any>(usersUrl + queryParams).pipe(
        map((resp: any) => {
          return resp;
        })
      )
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

  // Forgot Password (Email Link)
  forgotPassword(email: string): Observable<any> {
    return this.http.put(environment.apiUrl + "/user/forgot-password", email).pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

  // Reset Password (Change value to db)
  resetPassword(data: any): Observable<any> {
    return this.http.put(environment.apiUrl + "/user/reset-password", data).pipe(
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
  private saveAuthData(token: string, expirationDate, userId: string, isAdmin) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate);
    localStorage.setItem('userId', userId);
    localStorage.setItem('isAdmin', isAdmin);
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
      if (authInformation.isAdmin == "true") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
    // this.router.navigate(['departments']);
  }

  // Get Auth Data from local storage
  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const isAdmin = localStorage.getItem('isAdmin');
    if (!token && !expirationDate) { return }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      isAdmin: isAdmin
    }
  }

}
