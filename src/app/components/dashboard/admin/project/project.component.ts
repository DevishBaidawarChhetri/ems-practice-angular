import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { ProjectService } from 'src/app/services/project.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit, OnDestroy {
  projects: [];
  modalRef: BsModalRef;
  form: FormGroup;
  private projectUpdateListenerSubs: Subscription;
  currentPage: number = 1;
  postsPerPage: number = 10;
  totalPosts: number = 0;
  pageSizeOptions = [2, 5, 10, 25];
  projectLoading: boolean = false;
  tableId: string;
  fileName = `projects-from-page-${this.currentPage}.xlsx`;

  constructor(
    public dialog: MatDialog,
    private projectService: ProjectService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getProjectsWithPagination();
  }

  ngOnDestroy(): void {
    this.projectUpdateListenerSubs.unsubscribe();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getProjectsWithPagination() {
    this.projectLoading = true;
    this.projectService.getProjectsWithPagination(this.currentPage, this.postsPerPage).subscribe((resp) => {
      this.projects = resp.projects;
      this.totalPosts = resp.totalProjects;
      this.projectLoading = false;
    });
  }

  removeProject(e) {
    this.projectService.deleteProject(e).subscribe(
      resp => {
        this.getProjectsWithPagination();
        this.toastr.success(resp.message, "Success");
      }, (error) => {
        this.toastr.error(error.error.message, "Failed");
      }
    )
  }

  initializeForm() {
    this.form = this.fb.group({
      projectName: ['', [Validators.required]],
    });
    this.projectUpdateListenerSubs = this.projectService.getProjectUpdateStatusListener().subscribe(
      () => {
        this.getProjectsWithPagination();
      }
    )
  }

  onSubmit() {
    if (this.form.invalid) { return }
    this.projectService.addProject(this.form.value).subscribe(
      dept => {
        this.getProjectsWithPagination();
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
    this.getProjectsWithPagination();
  }

  // Get Table Id from child
  projectTableId(id){
    this.tableId = id
  }

  exportExcel() {
    let element = document.getElementById(this.tableId);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Projects');

    XLSX.writeFile(wb, this.fileName);
  }

}
