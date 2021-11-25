import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TimelogService } from 'src/app/services/timelog.service';
import { AddTimelogComponent } from '../addTimelog/addTimelog.component';

@Component({
  selector: 'app-timelog-list',
  templateUrl: './timelog-list.component.html',
  styleUrls: ['./timelog-list.component.css']
})
export class TimelogListComponent implements OnInit, OnChanges {
  logs = [];
  cancelClicked = false;

  @Input('todayDate') todayDateProps;
  @Input('differentDateLogs') differentDateLogsProps;
  @Input('timeLogLoading') timeLogLoading;
  @Output('dateSubmit') dateSubmitEvent = new EventEmitter<any>();
  @Output('removeTimelog') removeTimelogEvent = new EventEmitter<any>();

  modalRef: BsModalRef;

  constructor(
    private timelogService: TimelogService,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.logs = this.differentDateLogsProps;
    this.dateSubmitEvent.emit(this.logs[0]?.date);
  }

  deleteTimelog(id) {
    this.removeTimelogEvent.emit(id);
    // this.getSelfLogs();
  }
  openModalComponent(selectedTimelog) {
    const initialState = {
      selectedLog: selectedTimelog
    };
    this.modalRef = this.modalService.show(AddTimelogComponent, { initialState });
  }
}
