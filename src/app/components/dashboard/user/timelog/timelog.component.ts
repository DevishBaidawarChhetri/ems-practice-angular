import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddTimelogComponent } from './addTimelog/addTimelog.component';
import * as moment from 'moment';
import { TimelogService } from 'src/app/services/timelog.service';
import { delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.css']
})
export class TimelogComponent implements OnInit {

  bsModalRef: BsModalRef;
  todayDate: string;
  weekDays = [];
  logs = [];
  currentMonth: string;
  currentYear: string;

  constructor(
    private modalService: BsModalService,
    private timelogService: TimelogService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCurrentWeek();
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(AddTimelogComponent, {});
  }

  getCurrentWeek() {
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('week');

    this.todayDate = currentDate.format().split("T")[0];
    this.currentMonth = currentDate.format("MMMM");
    this.currentYear = currentDate.format("YYYY");

    for (let i = 0; i <= 6; i++) {
      this.weekDays.push(moment(weekStart).add(i, 'days').format().split("T")[0]);
    }
  }

  onDateClick(date) {
    this.timelogService.getSelfTimelog(date)
      .subscribe(async (resp) => {
        this.logs = await resp.logs
      })
  }

  async getNewDate(date) {
    this.todayDate = await date;
  }

  removeTimelog(id) {
    this.timelogService.deleteTimeLog(id).subscribe((resp) => {
      this.toastr.success(resp.message, "Success")
    }, (error) => {
      this.toastr.error(error.error.message, "Error")
    })
  }
}
