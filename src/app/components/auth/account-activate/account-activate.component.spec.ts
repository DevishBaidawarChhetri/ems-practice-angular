import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { of } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { AccountActivateComponent } from "./account-activate.component";


describe('AccountActivateComponent', () => {
  let component: AccountActivateComponent;
  let fixture: ComponentFixture<AccountActivateComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AccountActivateComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountActivateComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call "confirmAccount()" on button click', () => {
    const btn = fixture.debugElement.query(By.css('.mb-3'));
    btn.triggerEventHandler('click', {});
    fixture.detectChanges();
    authService.confirmAccount = jest.fn().mockReturnValue(of({}));
    router.navigate = jest.fn();
    component.confirmAccount();
    expect(authService.confirmAccount).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  });

});
