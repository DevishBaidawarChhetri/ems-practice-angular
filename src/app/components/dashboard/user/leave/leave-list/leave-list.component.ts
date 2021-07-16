import { Component, Input, OnInit} from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
})

export class LeaveListComponent implements OnInit {
  modalRef: BsModalRef;

  @Input('leaveList') leaveListProps: [];

  constructor(
    private modalService: BsModalService,
  ) {}
  ngOnInit(): void{
    console.log(this.leaveListProps);
  }
}
