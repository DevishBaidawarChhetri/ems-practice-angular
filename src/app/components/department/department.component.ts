import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { DepartmentService } from '../../services/department.service';
import { Department } from '../../interfaces/department';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit, OnDestroy {
  departments: Department[];
  modalRef: BsModalRef;
  form: FormGroup;
  private deptUpdateListenerSubs: Subscription;

  constructor(
    public dialog: MatDialog,
    private departmentService: DepartmentService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getDepartments();
  }

  ngOnDestroy(): void {
    this.deptUpdateListenerSubs.unsubscribe();
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
        this.toastr.success(dept.message, "Success");
      }
    )
  }

  initializeForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.deptUpdateListenerSubs = this.departmentService.getDeptUpdateStatusListener().subscribe(
      () => {
        this.getDepartments();
      }
    )
  }

  onSubmit() {
    if (this.form.invalid) { return }
    this.departmentService.addDepartment(this.form.value).subscribe(
      dept => {
        this.getDepartments();
        this.toastr.success(dept.message, "Success");
      }, (error) => {
        this.toastr.error(error.error.message, "Failed");
      }
    );
    this.modalRef.hide();
    this.form.reset();
  }
}
