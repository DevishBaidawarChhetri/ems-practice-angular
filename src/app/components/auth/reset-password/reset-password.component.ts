import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidator } from 'src/app/utils/password.validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  passwordResetForm: FormGroup;
  token: string = '';
  data: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.token = this.route.snapshot.params.token;
  }

  initializeForm() {
    this.passwordResetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: PasswordValidator })
  }

  onPasswordUpdate() {
    if (this.passwordResetForm.invalid) { return; }
    this.data = {
      resetLink: this.token,
      password: this.passwordResetForm.value.password,
      confirmPassword: this.passwordResetForm.value.password,
    }
    this.authService.resetPassword(this.data).subscribe(
      (resp) => {
        this.router.navigate(['/login']);
        this.toastr.success(resp.message + " Please login to continue.", "Success");
      }, (error) => {
        this.toastr.error(error.error.message, 'Failed');
      }
    )
  }
}
