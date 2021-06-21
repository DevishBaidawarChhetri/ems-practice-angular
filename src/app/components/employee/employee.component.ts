import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  employees$: Observable<Employee[]>;
  modalRef: BsModalRef;


  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((emp) => {
      this.employees$ = emp;
    });
  }

  employeeDelete(employeeId) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      employee => {
        this.getEmployees();
      }
    );
  }
}
