import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaskConstant } from 'src/app/constants/mask.constant';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidator } from 'src/app/utils/password.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  phoneMask = MaskConstant.PHONE;

  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: PasswordValidator })
  }

  onSignup() {
    if (this.form.invalid) { return; }
    this.authService.registerUser(this.form.value).subscribe((response) => {
      this.router.navigate(['/login']);
      this.toastr.success(response.message, "Success");
    }, (error) => {
      this.toastr.error(error.error.error, "Failed");
    })
  }

}
