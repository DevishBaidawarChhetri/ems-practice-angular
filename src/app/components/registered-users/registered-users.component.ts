import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {
  users: [];

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getAllRegisteredUsers();
  }
  getAllRegisteredUsers() {
    this.authService.getAllRegisteredUsers().subscribe(
      (resp) => {
        this.users = resp.users;
        console.log(this.users);
      }
    )
  }
}
