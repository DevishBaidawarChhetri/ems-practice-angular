import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { of } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { ResetPasswordComponent } from "./reset-password.component";

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let authService: AuthService;
  let token = "token";
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check form invalid', () => {
    expect(component.passwordResetForm.valid).toBeFalsy();
  });

  it('should check form invalid', () => {
    expect(component.passwordResetForm.valid).toBeFalsy();
  });

  it('should check invalid password ', () => {
    const password = component.passwordResetForm.controls['password'];
    expect(password.invalid).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();
    password.setValue('1234');
    expect(password.errors['minlength']).toBeTruthy();
  });

  it('should check invalid confirm password ', () => {
    const confirmPassword = component.passwordResetForm.controls['confirmPassword'];
    expect(confirmPassword.invalid).toBeTruthy();
    expect(confirmPassword.errors['required']).toBeTruthy();
    confirmPassword.setValue('1234');
    expect(confirmPassword.errors['minlength']).toBeTruthy();
  });

  it('should check valid password ', () => {
    const password = component.passwordResetForm.controls['password'];
    password.setValue('12345678');
    expect(password.errors).toBeNull();
  });

  it('should check valid confirm password ', () => {
    const confirmPassword = component.passwordResetForm.controls['confirmPassword'];
    confirmPassword.setValue('12345678');
    expect(confirmPassword.errors).toBeNull();
  });

  it('should check valid user password and confirm password', () => {
    const password = component.passwordResetForm.controls['password'];
    const confirmPassword = component.passwordResetForm.controls['confirmPassword'];
    password.setValue('devish');
    confirmPassword.setValue('devish');
    expect(component.passwordResetForm.controls['password'].value).toBe(component.passwordResetForm.controls['confirmPassword'].value);
  });


  it('should check invalid user password and confirm password', () => {
    const password = component.passwordResetForm.controls['password'];
    const confirmPassword = component.passwordResetForm.controls['confirmPassword'];
    password.setValue('devish');
    confirmPassword.setValue('devish123');
    expect(component.passwordResetForm.controls['password'].value).not.toBe(component.passwordResetForm.controls['confirmPassword'].value);
  });

  it('should call "onPasswordUpdate()" on form submit', () => {
    expect(component.passwordResetForm.invalid).toBeTruthy();
    let btn = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(btn.nativeElement.disabled).toBeTruthy();
    component.passwordResetForm.setValue({
      password: "devish",
      confirmPassword: "devish",
    });
    expect(component.passwordResetForm.valid).toBeTruthy();
    fixture.detectChanges();
    expect(btn.nativeElement.disabled).toBeFalsy();
    authService.resetPassword = jest.fn().mockReturnValue(of({}));
    router.navigate = jest.fn();
    component.onPasswordUpdate();
    expect(router.navigate).toHaveBeenCalled();
    expect(authService.resetPassword).toHaveBeenCalled();
  });

});
