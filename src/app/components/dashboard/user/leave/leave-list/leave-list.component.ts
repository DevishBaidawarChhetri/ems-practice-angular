import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
})

export class LeaveListComponent implements OnInit {
  modalRef: BsModalRef;
  userId: string = localStorage.getItem('userId');

  @Input('leaveList') leaveListProps: [];
  @Input('isAdmin') isAdminProps;
  @Input('leaveRequestLoading') leaveRequestLoading;
  @Output('deleteLeaveRequest') deleteLeaveRequestEvent = new EventEmitter<any>();
  @Output('approveLeaveRequest') approveLeaveRequestEvent = new EventEmitter<any>();

  constructor(
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void{
  }

  deleteLeaveRequest(id) {
    this.deleteLeaveRequestEvent.emit(id);
  }

  approveLeave(event: MatSlideToggleChange, id: string){
    // we can only pass one parameter in event emitter...
    // for multiple value pass, we can pass through object 😃
    this.approveLeaveRequestEvent.emit({event, id});
  }
}
