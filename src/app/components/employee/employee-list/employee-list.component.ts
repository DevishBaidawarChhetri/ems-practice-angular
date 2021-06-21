import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {

  @Input('employeeList') employeesListProps: [];
  @Output('removeEmployee') removeEmployeeEvent = new EventEmitter<any>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  deleteEmployee(id): void {
    this.removeEmployeeEvent.emit(id);
  }
}
