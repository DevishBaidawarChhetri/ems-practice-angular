import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Department } from 'src/app/interfaces/department';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
})
export class UpdateEmployeeComponent implements OnInit {
  emp: any;
  form: FormGroup;
  departments: Department[];

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getDepartments();
  }

  initializeForm() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required,]],
      email: ['', [Validators.required,]],
      gender: ['', [Validators.required,]],
      department: ['', [Validators.required,]],
    })

    this.form.setValue({
      fullName: this.emp.fullName,
      email: this.emp.email,
      gender: this.emp.gender,
      department: this.emp.department,
    })
  }
  updateEmployee() {
    if (this.form.invalid) { return; }
    console.log(this.form.value);

  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      dept => {
        this.departments = dept;
      }
    );
  }
}
