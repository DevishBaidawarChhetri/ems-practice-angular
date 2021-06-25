import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateDepartmentComponent } from '../update-department/update-department.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
})
export class DepartmentListComponent implements OnInit {
  modalRef: BsModalRef;
  dept: any;

  @Input('departmentLists') departmentListsProps;
  @Output('removeDepartment') removeDepartmentEvent = new EventEmitter<any>();

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
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
