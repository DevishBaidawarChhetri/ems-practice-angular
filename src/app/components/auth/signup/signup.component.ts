import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/utils/password.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }

  constructor(
    private fb: FormBuilder,
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
    console.log(this.form.value);
  }

}
