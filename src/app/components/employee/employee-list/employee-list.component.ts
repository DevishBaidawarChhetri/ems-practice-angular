import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {

  @Input('employeeList') employeesListProps: [];
  @Output() remove = new EventEmitter<any>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  deleteEmployee(id): void {
    this.remove.emit(id);
  }
}
