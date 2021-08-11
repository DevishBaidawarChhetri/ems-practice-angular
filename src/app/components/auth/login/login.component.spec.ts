import { FormBuilder } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { LoginComponent } from "./login.component";

describe('LoginComponent', () => {
  let fixture: LoginComponent;
  let authServiceMock: any;
  let formBuilderMock: FormBuilder;
  let toastrMock: any;
  let modalServiceMock: BsModalService

  beforeEach(() => {
    authServiceMock = {
      loginUser: jest.fn(),
      forgotPassword: jest.fn()
    };
    toastrMock = {
      success: jest.fn(),
    };
    formBuilderMock = new FormBuilder();
    fixture = new LoginComponent(
      formBuilderMock,
      authServiceMock,
      toastrMock,
      modalServiceMock
    );
    fixture.ngOnInit();
  });

  describe('Login Form', () => {
    it('Should have a component instance', () => {
      expect(fixture).toBeTruthy();
    });

    it('Should Initialize login form', () => {
      const loginForm = {
        email: '',
        password: ''
      };
      expect(fixture.form.value).toEqual(loginForm);
    });

    it('Should invalidate the form', () => {
      fixture.form.controls.email.setValue('');
      fixture.form.controls.password.setValue('');
      expect(fixture.form.valid).toBeFalsy();
    });

    it('Should validate the form', () => {
      fixture.form.controls.email.setValue('ino@gmail.com');
      fixture.form.controls.password.setValue('devish123');
      expect(fixture.form.valid).toBeTruthy();
    });

    it('Should be invalid form', () => {
      const formData = {
        email: '',
        password: ''
      };
      fixture.onLogin();
      expect(authServiceMock.loginUser).not.toHaveBeenCalledWith(formData);
    });

    it('Should call onLogin', () => {
      const formData = {
        email: 'email@gmail.com',
        password: 'password'
      };
      fixture.onLogin();
      authServiceMock.loginUser(formData);
      authServiceMock.loginUser.mockReturnValue(of({}))
      expect(authServiceMock.loginUser).toBeCalled();
    });
  });

  describe('Password reset form', () => {
    beforeEach(() => {
      fixture.initializePasswordResetForm();
    });

    it('Should Initialize forgot password form', () => {
      const passwordResetForm = {
        email: '',
      };
      expect(fixture.forgotPasswordForm.value).toEqual(passwordResetForm);
    });

    it('Should be invalid form', () => {
      fixture.forgotPasswordForm.controls.email.setValue('');
      expect(fixture.forgotPasswordForm.valid).toBeFalsy();
    });

    it('Should be valid form', () => {
      fixture.forgotPasswordForm.controls.email.setValue('devish@gmail.com');
      expect(fixture.forgotPasswordForm.valid).toBeTruthy();
    });

    it('Should be invalid form', () => {
      const formData = {
        email: '',
      };
      fixture.onForgotPassword();
      expect(authServiceMock.forgotPassword).not.toHaveBeenCalledWith(formData);
    });

    it('Should be valid form', () => {
      const formData = {
        email: 'devish@gmail.com',
      };
      fixture.onForgotPassword();
      authServiceMock.forgotPassword(formData);
      authServiceMock.forgotPassword.mockReturnValue(of({}));
      expect(authServiceMock.forgotPassword).toBeCalled();
    });


    it('Should call onForgotPassword and reset form', () => {
      const formData = {
        email: 'devish@gmail.com'
      }
      fixture.onForgotPassword();
      authServiceMock.forgotPassword(formData);
      authServiceMock.forgotPassword.mockReturnValue(of({}));
      fixture.forgotPasswordForm.reset();
      expect(authServiceMock.forgotPassword).toBeCalled();
      expect(fixture.forgotPasswordForm.valid).toBeFalsy();
    });

  });
});
