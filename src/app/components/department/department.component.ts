import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DepartmentService } from '../../services/department.service';
import { Department } from '../../interfaces/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departments: Department[];
  constructor(
    public dialog: MatDialog,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((dept) => {
      this.departments = dept;
    });
  }

}
