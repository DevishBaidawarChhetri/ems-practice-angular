import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TimelogService } from 'src/app/services/timelog.service';

@Component({
  selector: 'app-timelog-list',
  templateUrl: './timelog-list.component.html',
  styleUrls: ['./timelog-list.component.css']
})
export class TimelogListComponent implements OnInit, OnChanges {
  logs = [];
  @Input('todayDate') todayDateProps;
  @Input('differentDateLogs') differentDateLogsProps;
  @Output('dateSubmit') dateSubmitEvent = new EventEmitter<any>();

  constructor(
    private timelogService: TimelogService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getSelfLogs();
  }

  ngOnChanges() {
    this.logs = this.differentDateLogsProps;
    this.dateSubmitEvent.emit(this.logs[0]?.date);
  }

  getSelfLogs() {
    this.timelogService.getSelfTimelog(this.todayDateProps).subscribe((resp) => {
      this.logs = resp.logs;
      this.toastr.success(resp.message, "Success");
    }, (error) => {
      this.toastr.error(error.error.message, "Failed");
    })
  }

}
