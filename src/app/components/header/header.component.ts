import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    console.log(this.isAuth);
  }

  userLogout() {
    console.log('Logout clicked')
  }
}
