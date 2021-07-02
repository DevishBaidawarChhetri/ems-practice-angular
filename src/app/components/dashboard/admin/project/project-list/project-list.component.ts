import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateProjectComponent } from '../update-project/update-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent implements OnInit {
  modalRef: BsModalRef;

  @Input('projectLists') projectListsProps;
  @Output('removeProject') removeProjectEvent = new EventEmitter<any>();

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
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
