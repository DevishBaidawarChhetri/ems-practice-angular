import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthService } from '../../../services/auth.service';
import { SignupComponent } from "./signup.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Router } from "@angular/router";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports:[
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should check invalid fields if left empty.', () => {
    component.form.setValue({
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      password: "",
      confirmPassword: "",
    });
    expect(component.form.valid).toBeFalsy();
  });

  it('should check pass validation if fields are properly filled.', () => {
    component.form.setValue({
      fullName: "Devish Baidawar Chhetri",
      email: "devish@gmail.com",
      phone: "9876654321",
      gender: "male",
      password: "devish",
      confirmPassword: "devish",
    });
    expect(component.form.valid).toBeTruthy();
  });

  it('should check invalid user email address', () => {
    const email = component.form.controls['email'];
    email.setValue('devish');
    expect(email.errors['email']).toBeTruthy();
  });

  it('should check valid user email address', () => {
    const email = component.form.controls['email'];
    email.setValue('devish@gmail.com');
    expect(email.errors).toBeNull();
  });

  it('should check invalid if user phone number is less than 10 digits', () => {
    const phone = component.form.controls['phone'];
    phone.setValue('123456789');
    expect(phone.errors['minlength']).toBeTruthy();
  });

  it('should check valid if user phone number is 10 digits', () => {
    const phone = component.form.controls['phone'];
    phone.setValue('1234567890');
    expect(phone.errors).toBeNull();
  });

  it('should check valid user password and confirm password', () => {
    const password = component.form.controls['password'];
    const confirmPassword = component.form.controls['confirmPassword'];
    password.setValue('devish');
    confirmPassword.setValue('devish');
    expect(component.form.controls['password'].value).toBe(component.form.controls['confirmPassword'].value);
  });

  it('should check invalid user password and confirm password', () => {
    const password = component.form.controls['password'];
    const confirmPassword = component.form.controls['confirmPassword'];
    password.setValue('devish');
    confirmPassword.setValue('devish123');
    expect(component.form.controls['password'].value).not.toBe(component.form.controls['confirmPassword'].value);
  });

  it('should check if form is submitted', () => {
    expect(component.form.invalid).toBeTruthy();
    let btn = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(btn.nativeElement.disabled).toBeTruthy();
    component.form.setValue({
      fullName: "Devish Baidawar Chhetri",
      email: "devish@gmail.com",
      phone: "9876654321",
      gender: "male",
      password: "devish",
      confirmPassword: "devish",
    });
    expect(component.form.valid).toBeTruthy();
    fixture.detectChanges();
    expect(btn.nativeElement.disabled).toBeFalsy();
    authService.registerUser = jest.fn().mockReturnValue(of({}));
    router.navigate = jest.fn();
    component.onSignup();
    expect(authService.registerUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

});
