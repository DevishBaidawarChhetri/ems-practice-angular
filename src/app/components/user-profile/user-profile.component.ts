import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidator } from 'src/app/utils/password.validators';
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
  passwordUpdateForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.initializeForm();
  }

  initializeForm() {
    this.passwordUpdateForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: PasswordValidator })
  }

  openProfileUpdateModalComponent() {
    this.bsModalRef = this.modalService.show(UpdateProfileComponent, {});
  }

  getLoggedInUser() {
    this.authService.loggedInUserInfo(this.userId).subscribe(({ user }) => {
      this.userInfo = user;
    })
  }

  openUpdatePasswordModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

  onPasswordUpdate() {
    if (this.passwordUpdateForm.invalid) { return; }
    this.authService.updatePassword(this.userId, this.passwordUpdateForm.value).subscribe(
      (res) => {
        this.passwordUpdateForm.reset();
        this.bsModalRef.hide();
      }
    );
  }
}
