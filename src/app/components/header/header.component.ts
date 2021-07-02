import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  isAdmin: boolean = false;
  private authListenerSubs: Subscription;
  private isAdminListenerSubs: Subscription;


  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.isAdmin = this.authService.getIsAdmin();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      (isAuthenticated) => {
        this.isAuth = isAuthenticated;
      }
    )
    this.isAdminListenerSubs = this.authService.getIsAdminStatusListener().subscribe(
      (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    )
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
