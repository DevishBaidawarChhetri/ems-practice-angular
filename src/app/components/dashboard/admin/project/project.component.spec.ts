import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { ProjectService } from "../../../../services/project.service";
import { ProjectComponent } from "./project.component";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { of } from "rxjs";


describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let projectService: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProjectComponent],
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
        ProjectService,
        BsModalService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function clickAddProjectButton() {
    const btn = fixture.debugElement.query(By.css('#addProjectButton'));
    btn.triggerEventHandler('click', {});
    fixture.detectChanges();
  }

  it('should open modal on clicking "Add Project"', () => {
    clickAddProjectButton();
    const modalTitle = document.querySelector('.modal-title').innerHTML;
    expect(modalTitle).toEqual('Add Project');
  });

  it('should check invalid project name.', () => {
    clickAddProjectButton();
    let getProjectName = component.form.controls['projectName'];
    getProjectName.setValue('');
    expect(getProjectName.errors).toBeTruthy();
  });

  it('should check valid project name.', () => {
    clickAddProjectButton();
    let getProjectName = component.form.controls['projectName'];
    getProjectName.setValue('Facebook');
    expect(getProjectName.errors).toBeNull();
  });

  it('should call "onSubmit()" after button click', () => {
    clickAddProjectButton();
    let getProjectName = component.form.controls['projectName'];
    getProjectName.setValue('Facebook');
    fixture.detectChanges();
    projectService.addProject = jest.fn().mockReturnValue(of({}));
    component.onSubmit();
    expect(projectService.addProject).toHaveBeenCalled();
  });

});
