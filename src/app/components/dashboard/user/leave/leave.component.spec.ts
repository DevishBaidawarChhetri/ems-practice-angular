import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ModalModule } from "ngx-bootstrap/modal";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { LeaveService } from "../../../../services/leave.service";
import { LeaveComponent } from "./leave.component";

describe('LeaveComponent', () => {
  let component: LeaveComponent;
  let fixture: ComponentFixture<LeaveComponent>;
  let leaveService: LeaveService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatInputModule,
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      declarations: [LeaveComponent],
      providers: [
        { provide: ToastrService, useValue: { success: () => { } } },
        LeaveService
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveComponent);
    component = fixture.componentInstance;
    leaveService = TestBed.inject(LeaveService);
    toastrService = TestBed.inject(ToastrService);
    component.ngOnInit();
    component.isAdmin = 'true';
    component.leaveRequestLoading = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function clickRequestLeaveButton() {
    component.isAdmin = 'false';
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#requestLeaveBtn'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();
  }

  it('should open modal on clicking "Request Leave"', () => {
    clickRequestLeaveButton();
    const modalTitle = document.querySelector('.modal-title').innerHTML;
    expect(modalTitle).toEqual('Request Leave');
  });

  it('should check if "Request Leave" form is invalid', () => {
    component.requestLeaveForm.controls['startDate'].setValue('');
    component.requestLeaveForm.controls['endDate'].setValue('');
    component.requestLeaveForm.controls['leaveType'].setValue('');
    component.requestLeaveForm.controls['note'].setValue('');
    expect(component.requestLeaveForm.invalid).toBeTruthy();
  });

  it('should check if "Request Leave" form is valid', () => {
    component.requestLeaveForm.controls['startDate'].setValue('2021-08-19T03:24:00');
    component.requestLeaveForm.controls['endDate'].setValue('2021-08-20T03:24:00');
    component.requestLeaveForm.controls['leaveType'].setValue('floating day');
    component.requestLeaveForm.controls['note'].setValue('Request for a holiday');
    expect(component.requestLeaveForm.valid).toBeTruthy();
  });

  it('should call "onSubmit" after button click', () => {
    clickRequestLeaveButton();
    component.requestLeaveForm.controls['startDate'].setValue('2021-08-19T03:24:00');
    component.requestLeaveForm.controls['endDate'].setValue('2021-08-20T03:24:00');
    component.requestLeaveForm.controls['leaveType'].setValue('floating day');
    component.requestLeaveForm.controls['note'].setValue('Request for a holiday');
    fixture.detectChanges();
  });

});
