import { FormBuilder } from "@angular/forms";
import { SignupComponent } from "./signup.component";

describe('SinupComponent', () => {
  let fixture: SignupComponent;
  let authServiceMock: any;
  let formBuilderMock: FormBuilder;
  let routerMock: any;
  let toastrServiceMock: any;

  beforeEach(() => {
    authServiceMock = {
      onSignup: jest.fn()
    };
    formBuilderMock = new FormBuilder();
    routerMock = jest.fn();
    toastrServiceMock = jest.fn();

    fixture = new SignupComponent(
      formBuilderMock,
      authServiceMock,
      routerMock,
      toastrServiceMock
    );
    fixture.ngOnInit();
  });

  describe('Signup Form', () => {
    it('Should initialize signup form.', () => {
      const mockRegisterForm = {
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
        confirmPassword: ''
      }
      expect(fixture.form.value).toEqual(mockRegisterForm);
    });

    it('Should validate empty form.', () => {
      fixture.form.controls['fullName'].setValue('');
      fixture.form.controls['email'].setValue('');
      fixture.form.controls['phone'].setValue('');
      fixture.form.controls.gender.setValue('');
      fixture.form.controls.password.setValue('');
      fixture.form.controls.confirmPassword.setValue('');
      expect(fixture.form.valid).toBeFalsy();
    });

    it('Should validate filled form.', () => {
      fixture.form.controls['fullName'].setValue('Devish Baidawar Chhetri');
      fixture.form.controls['email'].setValue('devish@gmail.com');
      fixture.form.controls['phone'].setValue('9843324011');
      fixture.form.controls.gender.setValue('male');
      fixture.form.controls.password.setValue('devish');
      fixture.form.controls.confirmPassword.setValue('devish');
      expect(fixture.form.valid).toBeTruthy();
    });

    it('Should validate if phone number is less than 10 digits.', () => {
      fixture.form.controls['phone'].setValue(null);
      fixture.form.controls.phone.setValue('9843324');
      const phone = fixture.form.controls.phone.value;
      if(phone.length < 10) {
        expect(fixture.form.invalid).toBeTruthy();
      }
    });

    it('Should invalid form if password is less than 6 characters.', () => {
      fixture.form.controls['password'].setValue('');
      fixture.form.controls.password.setValue('d');
      const password = fixture.form.controls.password.value;
      if(password.length < 6) {
        expect(fixture.form.invalid).toBeTruthy();
      }
    });

    it('Should invalid form if password and confirm password is different.', () => {
      fixture.form.controls['password'].setValue('');
      fixture.form.controls['confirmPassword'].setValue('');
      fixture.form.controls['password'].setValue('d');
      fixture.form.controls['confirmPassword'].setValue('devishhh');

      const password = fixture.form.controls.password.value;
      const confirmPassword = fixture.form.controls.confirmPassword.value;

      if(password !== confirmPassword) {
        expect(fixture.form.invalid).toBeTruthy();
      }
    });

    it('Should signup user.', () => {
      const signupForm = {
        fullName: 'Devish Baidawar Chhetri',
        email: 'devish@gmail.com',
        phone: '9843345678',
        gender: 'male',
        password: 'devish',
        confirmPassword: 'devish'
      }
      const response = {
        message: "Success Message from backend."
      }
      const spySignup = jest.spyOn(authServiceMock, 'onSignup').mockReturnValue(response);
      expect(authServiceMock.onSignup(signupForm)).toEqual(response);
      expect(spySignup).toHaveBeenCalledWith(signupForm);
    });

  });

});
