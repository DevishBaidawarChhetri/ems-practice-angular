import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateProfileComponent } from '../updateProfile/updateProfile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  bsModalRef: BsModalRef;
  userId: string = localStorage.getItem('userId');
  userInfo: any;

  constructor(
    private modalService: BsModalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  openProfileUpdateModalComponent() {
    this.bsModalRef = this.modalService.show(UpdateProfileComponent, {});
  }

  getLoggedInUser() {
    this.authService.loggedInUserInfo(this.userId).subscribe(({ user }) => {
      this.userInfo = user;
    })
  }
}
