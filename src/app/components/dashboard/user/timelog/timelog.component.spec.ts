import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatInputModule } from "@angular/material/input";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { ToastrModule } from "ngx-toastr";
import { of } from "rxjs";
import { TimelogService } from "../../../../services/timelog.service";
import { TimelogComponent } from "./timelog.component";

describe('TimelogComponent', () => {
  let component: TimelogComponent;
  let fixture: ComponentFixture<TimelogComponent>;
  let timelogService: TimelogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TimelogComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatInputModule,
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        TimelogService,
        BsModalService,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelogComponent);
    component = fixture.componentInstance;
    timelogService = TestBed.inject(TimelogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get logs as per date.', () => {
    const btn = fixture.debugElement.query(By.css('#weekDay'));
    btn.triggerEventHandler('click', {});
    timelogService.getSelfTimelog = jest.fn().mockReturnValue(of({}));
    component.onDateClick(new Date());
    expect(timelogService.getSelfTimelog).toHaveBeenCalled();
  });

  it('should open model when "Add Log" button is clicked.', () => {
    const btn = fixture.debugElement.query(By.css('#addLog'));
    btn.triggerEventHandler('click', {});
    component.openModalWithComponent = jest.fn();
    component.openModalWithComponent();
    expect(component.openModalWithComponent).toHaveBeenCalled();

  });


});
