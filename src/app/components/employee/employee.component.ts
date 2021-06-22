import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/interfaces/department';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  @Input('fullName') fullNameProps: ElementRef;

  employees$: Observable<Employee[]>;
  departments: Department[];
  modalRef: BsModalRef;
  form: FormBuilder;


  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((emp) => {
      this.employees$ = emp;
    });
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      dept => {
        this.departments = dept;
      }
    );
  }

  employeeDelete(employeeId) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      employee => {
        this.getEmployees();
      }
    );
  }
}
