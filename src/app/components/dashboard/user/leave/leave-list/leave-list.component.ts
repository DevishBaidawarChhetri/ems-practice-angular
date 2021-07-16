import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
})

export class LeaveListComponent implements OnInit {
  modalRef: BsModalRef;

  @Input('leaveList') leaveListProps: [];
  @Output('deleteLeaveRequest') deleteLeaveRequestEvent = new EventEmitter<any>();

  constructor(
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void{
  }

  deleteLeaveRequest(id) {
    this.deleteLeaveRequestEvent.emit(id);
  }
}
