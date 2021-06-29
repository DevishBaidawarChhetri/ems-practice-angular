import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  forgotPasswordForm: FormGroup;

  modalRef: BsModalRef;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  initializePasswordResetForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
    })
  }

  onLogin() {
    if (this.form.invalid) { return; }
    this.authService.loginUser(this.form.value).subscribe(
      (resp) => {
        this.toastr.success(resp.message, 'Success');
      }, (error) => {
        this.toastr.error(error.error.message, 'Failed');
      });
  }

  openForgotPasswordModal(templateForm: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateForm);
    this.initializePasswordResetForm();
  }

  onForgotPassword() {
    if (this.forgotPasswordForm.invalid) { return; }
    console.log(this.forgotPasswordForm.value)
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      (resp) => {
        this.toastr.success(resp.message, "Success");
        this.modalRef.hide();
        this.forgotPasswordForm.reset();
      }, (error) => {
        this.toastr.error(error.error.message, 'Failed');
      }
    )
  }
}
