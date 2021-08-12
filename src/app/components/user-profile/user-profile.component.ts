import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PasswordValidator } from '../../utils/password.validators';
import { UpdateProfileComponent } from '../updateProfile/updateProfile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  userId: string = localStorage.getItem('userId');
  userInfo: any;
  passwordUpdateForm: FormGroup;
  private userProfileListnerSubs: Subscription;

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.userProfileListnerSubs = this.authService.getprofileUpdateStatusListener().subscribe(() => {
      this.getLoggedInUser();
    })
  }

  ngOnDestroy(): void {
    this.userProfileListnerSubs.unsubscribe();
  }

  initializeForm() {
    this.getLoggedInUser();
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
        this.toastr.success(res.message, "Success");
      }
    );
  }
}
