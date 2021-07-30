import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateDepartmentComponent } from '../update-department/update-department.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
})
export class DepartmentListComponent implements OnInit {
  modalRef: BsModalRef;
  cancelClicked = false;

  @Input('departmentLists') departmentListsProps;
  @Input('departmentLoading') departmentLoading: boolean;
  @Output('removeDepartment') removeDepartmentEvent = new EventEmitter<any>();

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }

  deleteDepartment(id): void {
    this.removeDepartmentEvent.emit(id);
  }

  openModalDepartmentUpdateComponent(selectedDepartment) {
    const initialState = {
      dept: selectedDepartment
    };
    this.modalRef = this.modalService.show(UpdateDepartmentComponent, { initialState });
  }

}
