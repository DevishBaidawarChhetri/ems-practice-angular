import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  modalRef: BsModalRef;

  @Input('employeeList') employeesListProps: [];
  @Input('employeeLoading') employeeLoading: boolean;
  @Output('removeEmployee') removeEmployeeEvent = new EventEmitter<any>();

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }

  deleteEmployee(id): void {
    this.removeEmployeeEvent.emit(id);
  }

  openModalEmployeeUpdateComponent(selectedEmp) {
    const initialState = {
      emp: selectedEmp
    };
    this.modalRef = this.modalService.show(UpdateEmployeeComponent, { initialState });
  }
}
