import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DepartmentService } from '../../services/department.service';
import { Department } from '../../interfaces/department';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {
  departments: Department[];
  modalRef: BsModalRef;

  constructor(
    public dialog: MatDialog,
    private departmentService: DepartmentService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getDepartments();
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

}
