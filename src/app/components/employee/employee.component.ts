import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';
import { Observable, Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/interfaces/department';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  @Input('fullName') fullNameProps: ElementRef;

  employees$: Observable<Employee[]>;
  departments: Department[];
  modalRef: BsModalRef;
  form: FormGroup;
  private empUpdateListenerSubs: Subscription;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.initializeForm();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.getDepartments();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((emp) => {
      this.employees$ = emp;
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required,]],
      email: ['', [Validators.required,]],
      gender: ['', [Validators.required,]],
      department: ['', [Validators.required,]],
    })
    this.empUpdateListenerSubs = this.employeeService.getEmpUpdateStatusListener().subscribe(
      () => {
        this.getEmployees();
      }
    )
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

  onSubmit(): void {
    if (this.form.invalid) { return }
    this.employeeService.addEmployee(this.form.value).subscribe(
      employee => {
        this.getEmployees();
      }
    );
    this.modalRef.hide();
    this.form.reset();
  }
}
