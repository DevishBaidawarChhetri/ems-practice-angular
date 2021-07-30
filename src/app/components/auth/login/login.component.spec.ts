import { FormBuilder } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { LoginComponent } from "./login.component";

describe('LoginComponent', () => {
  let  fixture: LoginComponent;
  let authServiceMock: any;
  let formBuilderMock: FormBuilder;
  let toastrMock: ToastrService;
  let modalServiceMock: BsModalService

  beforeEach(() => {
    authServiceMock = {
      loginUser: jest.fn()
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

  describe('Test: Should Create Component', () => {
    it('Should have a component instance', () => {
      expect(fixture).toBeTruthy();
    });
  });

  describe('Test: ngOnInit', () => {
    it('Should Initialize login form', () => {
      const loginForm = {
        email: '',
        password: ''
      };
      expect(fixture.form.value).toEqual(loginForm);
    });
  });

  describe('Test: login form', () => {
    it('Should invalidate the form', () => {
      fixture.form.controls.email.setValue('');
      fixture.form.controls.password.setValue('');
      expect(fixture.form.valid).toBeFalsy();
    });

    it('should validate the form', () => {
      fixture.form.controls.email.setValue('ino@gmail.com');
      fixture.form.controls.password.setValue('devish123');
      expect(fixture.form.valid).toBeTruthy();
    });
  });

  describe('Test: form invalid', () => {
    it('Test: Form invalid', () => {
      const formData = {
        email: '',
        password: ''
      };
      fixture.onLogin();
      expect(authServiceMock.loginUser).not.toHaveBeenCalledWith(formData);
    });
  });

  describe('Test: form valid', () => {
    it('should call onLogin', () => {
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
});
