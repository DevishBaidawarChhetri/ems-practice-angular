import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from "ngx-toastr";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { getMaxListeners } from "process";
import { of } from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
        BrowserAnimationsModule
      ],
      declarations: [LoginComponent],
      providers: [AuthService, BsModalService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check invalid user email address', () => {
    const email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('devish');
    expect(email.errors['email']).toBeTruthy();
  });

  it('should check valid user email address', () => {
    const email = component.form.controls['email'];
    email.setValue('devish@gmail.com');
    expect(email.errors).toBeNull();
  });

  it('should check invalid user password ', () => {
    const password = component.form.controls['password'];
    expect(password.invalid).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();
    password.setValue('1234');
    expect(password.errors['minlength']).toBeTruthy();
  });

  it('should check valid user password', () => {
    const password = component.form.controls['password'];
    password.setValue('123456');
    expect(password.errors).toBeNull();
  });

  it('should check form is invalid if no value is entered ', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should check form is valid if all values are entered', () => {
    component.form.controls['email'].setValue('devish@gmail.com');
    component.form.controls['password'].setValue('123456');
    expect(component.form.valid).toBeTruthy();
  });

  it('should check form is submitted.', () => {
    expect(component.form.invalid).toBeTruthy();
    let btn = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(btn.nativeElement.disabled).toBeTruthy();

    component.form.patchValue ({email: 'devish@getMaxListeners.com', password: '123456'});
    expect(component.form.valid).toBeTruthy();

    fixture.detectChanges();
    expect(btn.nativeElement.disabled).toBeFalsy();

    authService.loginUser = jest.fn().mockReturnValue(of({}));
    component.onLogin();
    expect(authService.loginUser).toHaveBeenCalled();
  });

  describe('Forgot Password', () => {
    it('should open modal on clicking "Forgot Password?"', () => {
      const btn = fixture.debugElement.query(By.css('.me-3'));
      btn.triggerEventHandler('click', {});
      fixture.detectChanges();
      const modalTitle = document.querySelector('.modal-title').innerHTML;
      expect(modalTitle).toEqual('Forgot Password');
    });

    it('should check invalid user email address (Forgot Password)', () => {
      const btn = fixture.debugElement.query(By.css('.me-3'));
      btn.triggerEventHandler('click', {});
      fixture.detectChanges();

      let email = component.forgotPasswordForm.controls['email'];
      email.setValue('devish');
      expect(email.errors).toBeTruthy();
    });

    it('should check valid user email address (Forgot Password)', () => {
      const btn = fixture.debugElement.query(By.css('.me-3'));
      btn.triggerEventHandler('click', {});
      fixture.detectChanges();

      let email = component.forgotPasswordForm.controls['email'];
      email.setValue('devish@gmail.com');
      expect(email.errors).toBeNull();
    });

    it('should check if form is submitted', () => {
      const btn = fixture.debugElement.query(By.css('.me-3'));
      btn.triggerEventHandler('click', {});
      fixture.detectChanges();

      let email = component.forgotPasswordForm.controls['email'];
      email.setValue('devish@gmail.com');
      expect(email.errors).toBeNull();

      fixture.detectChanges();
      expect(btn.nativeElement.disabled).toBeFalsy();

      authService.forgotPassword = jest.fn().mockReturnValue(of({}));
      component.onForgotPassword();
      expect(authService.forgotPassword).toHaveBeenCalled();
      expect(component.forgotPasswordForm.invalid).toBeTruthy();
    });
  });



})
