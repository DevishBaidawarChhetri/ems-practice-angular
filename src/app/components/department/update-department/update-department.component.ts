import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
})
export class UpdateDepartmentComponent implements OnInit {
  dept: any;
  form: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    })

    this.form.setValue({
      name: this.dept.name
    })
  }

  updateDepartment() {
    if (this.form.invalid) { return; }
    this.departmentService.updateDepartment(this.dept._id, this.form.value).subscribe((res) => {
      if (res) {
        this.bsModalRef.hide();
        this.form.reset();
      }
    });
  }
}
