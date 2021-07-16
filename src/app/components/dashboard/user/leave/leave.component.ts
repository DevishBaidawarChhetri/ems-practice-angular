import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { LeaveService } from "src/app/services/leave.service";

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
})

export class LeaveComponent implements OnInit {
  modalRef: BsModalRef;
  todayDate: string = moment().format().split("T")[0];
  startDate: any | null;
  endDate: any | null;
  maxChars: number = 200;
  requestedLeaves = [];
  requestLeaveForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private leaveService: LeaveService,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void{
    this.initializeForm();
    this.getSelfRequestedLeaves();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  initializeForm() {
    this.requestLeaveForm = new FormGroup({
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
      leaveType: new FormControl("", Validators.required),
      note: new FormControl("", Validators.required)
    });
  };

  getSelfRequestedLeaves() {
    this.leaveService.getSelfLeaveRequest().subscribe((resp) => {
      this.requestedLeaves = resp.leaves;
    })
  }

  onSubmit() {
    if (this.requestLeaveForm.invalid) { return; }
    this.leaveService.requestLeave(this.requestLeaveForm.value).subscribe((resp) => {
      this.toastr.success(resp.message, "Success");
      this.modalRef.hide();
      this.requestLeaveForm.reset();
      this.getSelfRequestedLeaves();
    }, (error) => {
      this.toastr.error(error.error.message, "Failed!");
    })
  }

  deleteLeave(id: string) {
    this.leaveService.deleteSelfLeaveRequest(id).subscribe((resp: any) => {
      this.toastr.success(resp.message, "Success!");
      this.getSelfRequestedLeaves();
    }, (error) => {
      this.toastr.error(error.error.message, "Failed!")
    })
  }
}
