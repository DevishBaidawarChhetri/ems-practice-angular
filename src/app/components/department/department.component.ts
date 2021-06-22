import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DepartmentService } from '../../services/department.service';
import { Department } from '../../interfaces/department';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {
  departments: Department[];
  modalRef: BsModalRef;
  form: FormGroup;

  constructor(
    public dialog: MatDialog,
    private departmentService: DepartmentService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getDepartments();
    this.initializeForm();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((dept) => {
      this.departments = dept;
    });
  }

  removeDepartment(e) {
    this.departmentService.deleteDepartment(e).subscribe(
      dept => {
        this.getDepartments();
      }
    )
  }

  initializeForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) { return }
    this.departmentService.addDepartment(this.form.value).subscribe(
      dept => {
        this.getDepartments();
      }
    );
    this.modalRef.hide();
    this.form.reset();
  }
}
