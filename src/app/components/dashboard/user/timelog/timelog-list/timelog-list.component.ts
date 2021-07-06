import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TimelogService } from 'src/app/services/timelog.service';

@Component({
  selector: 'app-timelog-list',
  templateUrl: './timelog-list.component.html',
  styleUrls: ['./timelog-list.component.css']
})
export class TimelogListComponent implements OnInit {
  logs = [];
  constructor(
    private timelogService: TimelogService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getSelfLogs();
  }

  getSelfLogs() {
    this.timelogService.getSelfTimelog().subscribe((resp) => {
      this.logs = resp.logs;
      this.toastr.success = resp.message, "Success";
    }, (error) => {
      this.toastr.error = error.error.message, "Failed";
    })
  }

}
