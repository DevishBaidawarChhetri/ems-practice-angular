import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../../../interfaces/department';
import { DepartmentService } from '../../../services/department.service';
import { EmployeeService } from '../../../services/employee.service';

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
    private toastr: ToastrService,
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
    this.employeeService.updateDepartment(this.emp._id, this.form.value).subscribe((res) => {
      if (res) {
        this.bsModalRef.hide();
        this.form.reset();
        this.toastr.success(res.message, "Success");
      }
    })
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      dept => {
        this.departments = dept;
      }
    );
  }
}
