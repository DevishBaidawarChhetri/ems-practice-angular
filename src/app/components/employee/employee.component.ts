import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';
import { Observable, Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../interfaces/department';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

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
  currentPage: number = 1;
  postsPerPage: number = 10;
  totalPosts: number = 0;
  pageSizeOptions = [2, 5, 10, 25];
  employeeLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
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
    this.employeeLoading = true;
    this.employeeService.getEmployeesWithPagination(this.currentPage, this.postsPerPage).subscribe((emp) => {
      this.employees$ = emp.employees;
      this.totalPosts = emp.maxPosts;
      this.employeeLoading = false;
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
        this.toastr.success(employee.message, 'Success');
      }
    );
  }

  onSubmit(): void {
    if (this.form.invalid) { return }
    this.employeeService.addEmployee(this.form.value).subscribe(
      employee => {
        this.getEmployees();
        this.toastr.success(employee.message, 'Success');
      }
    );
    this.modalRef.hide();
    this.form.reset();
  }

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getEmployees();
  }
}
