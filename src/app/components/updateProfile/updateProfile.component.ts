import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './updateProfile.component.html',
})
export class UpdateProfileComponent implements OnInit {
  profileUpdateForm: FormGroup;
  userId: string = localStorage.getItem('userId');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public bsModalRef: BsModalRef,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.profileUpdateForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      gender: ['', [Validators.required]],
    })
    this.getProfileDetails(this.userId);
  }

  onProfileUpdate() {
    if (this.profileUpdateForm.invalid) { return; }

    this.authService.updateProfile(this.userId, this.profileUpdateForm.value).subscribe((response) => {
      if (response) {
        this.bsModalRef.hide();
        this.router.navigate(['/employees']);
      }
    });
  }

  getProfileDetails(userId: string) {
    this.authService.loggedInUserInfo(userId).subscribe(({ user }) => {
      this.profileUpdateForm.patchValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
      })
    })
  }
}
