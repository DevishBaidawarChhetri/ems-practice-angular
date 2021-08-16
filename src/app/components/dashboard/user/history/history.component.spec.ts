import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { TimelogService } from "../../../../services/timelog.service";
import { HistoryComponent } from "./history.component";

describe("HistoryComponent", () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let timelogService: TimelogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HistoryComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        TimelogService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    timelogService = TestBed.inject(TimelogService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get weeks log", () => {
    fixture.detectChanges();
    timelogService.getWeeksLog = jest.fn().mockReturnValue(of({}));
    component.initializeValues();
    expect(timelogService.getWeeksLog).toHaveBeenCalled();
  });

});
