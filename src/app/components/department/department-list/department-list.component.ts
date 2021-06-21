import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
})
export class DepartmentListComponent implements OnInit {

  @Input('departmentLists') departmentListsProps;
  @Output('removeDepartment') removeDepartmentEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteDepartment(id): void {
    this.removeDepartmentEvent.emit(id);
  }

}
