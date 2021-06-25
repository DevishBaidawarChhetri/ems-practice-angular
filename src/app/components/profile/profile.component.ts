import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidator } from 'src/app/utils/password.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  userId: string = localStorage.getItem('userId');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getProfileDetails(this.userId);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['', [Validators.minLength(6)]],
    }, { validator: PasswordValidator })
  }

  onProfileUpdate() {
    if (this.form.invalid) { return; }
    console.log(this.form.value);

    this.authService.updateProfile(this.userId, this.form.value).subscribe((response) => {
      if (response) {
        this.bsModalRef.hide();
      }
    });
  }

  getProfileDetails(userId: string) {
    this.authService.loggedInUserInfo(userId).subscribe(({ user }) => {
      this.form.setValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        password: '',
        confirmPassword: ''
      })
    })
  }
}
