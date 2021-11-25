import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateProjectComponent } from '../update-project/update-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent implements OnInit, AfterViewInit {
  modalRef: BsModalRef;
  cancelClicked = false;

  @Input('projectLists') projectListsProps;
  @Input('projectLoading') projectLoading: boolean;
  @Output('removeProject') removeProjectEvent = new EventEmitter<any>();
  @Output('projectTableId') projectTableId = new EventEmitter<any>();
  @ViewChild('projectTable', {static: false}) projectTable: ElementRef;

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // console.log(this.projectTable.nativeElement.id);
    this.projectTableId.emit(this.projectTable.nativeElement.id);
  }

  deleteProject(id): void {
    this.removeProjectEvent.emit(id);
  }

  openModalProjectUpdateComponent(selectedDepartment) {
    const initialState = {
      project: selectedDepartment
    };
    this.modalRef = this.modalService.show(UpdateProjectComponent, { initialState });
  }



}
