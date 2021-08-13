import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { DepartmentService } from "../../services/department.service";
import { DepartmentComponent } from "./department.component";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { of } from "rxjs";

describe('DepartmentComponent', () => {
  let component: DepartmentComponent;
  let fixture: ComponentFixture<DepartmentComponent>;
  let departmentService: DepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DepartmentComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule.forRoot(),
        MatInputModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      providers: [
        DepartmentService,
        BsModalService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentComponent);
    component = fixture.componentInstance;
    departmentService = TestBed.inject(DepartmentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function clickAddDepartmentButton() {
    const btn = fixture.debugElement.query(By.css('#addDepartmentModal'));
    btn.triggerEventHandler('click', {});
    fixture.detectChanges();
  }

  it('should open modal on clicking "Add Department"', () => {
    clickAddDepartmentButton();
    const modalTitle = document.querySelector('.modal-title').innerHTML;
    expect(modalTitle).toEqual('Add Department');
  });

  it('should check invalid department name.', () => {
    clickAddDepartmentButton();
    let getDeptName = component.form.controls['name'];
    getDeptName.setValue('');
    expect(getDeptName.errors).toBeTruthy();
  });

  it('should check valid department name.', () => {
    clickAddDepartmentButton();
    let getDeptName = component.form.controls['name'];
    getDeptName.setValue('Engineering');
    expect(getDeptName.errors).toBeNull();
  });

  it('should call "onSubmit" after button click', () => {
    clickAddDepartmentButton();
    let getDeptName = component.form.controls['name'];
    getDeptName.setValue('Engineering');
    fixture.detectChanges();
    departmentService.addDepartment = jest.fn().mockReturnValue(of({}));
    component.onSubmit();
    expect(departmentService.addDepartment).toHaveBeenCalled();
  });


});
