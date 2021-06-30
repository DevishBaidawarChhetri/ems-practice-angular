import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { DepartmentService } from '../../services/department.service';
import { Department } from '../../interfaces/department';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit, OnDestroy {
  departments: Department[];
  modalRef: BsModalRef;
  form: FormGroup;
  private deptUpdateListenerSubs: Subscription;
  currentPage: number = 1;
  postsPerPage: number = 5;
  totalPosts: number = 0;
  pageSizeOptions = [2, 5, 10, 25];

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
    console.log(this.currentPage, this.postsPerPage, this.totalPosts);

  }

  ngOnDestroy(): void {
    this.deptUpdateListenerSubs.unsubscribe();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getDepartments() {
    this.departmentService.getDepartmentWithPagination(this.currentPage, this.postsPerPage).subscribe((dept) => {
      this.departments = dept.departments;
      this.totalPosts = dept.maxPosts;
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

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getDepartments();
    console.log(pageData);

  }
}
