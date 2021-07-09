import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddTimelogComponent } from './addTimelog/addTimelog.component';
import * as moment from 'moment';
import { TimelogService } from 'src/app/services/timelog.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.css']
})
export class TimelogComponent implements OnInit {

  bsModalRef: BsModalRef;
  todayDate = moment().format().split("T")[0];
  weekDays = [];
  logs = [];
  currentMonth: string;
  currentYear: string;
  private timelogAddListenerSubs: Subscription;

  constructor(
    private modalService: BsModalService,
    private timelogService: TimelogService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCurrentWeek();
    this.getTodaysLog();
    this.isNewTimelogAdded();
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(AddTimelogComponent, {});
  }

  async getTodaysLog() {
    await this.timelogService.getSelfTimelog(this.todayDate).subscribe((resp) => {
      this.logs = resp.logs;
    })
  }

  isNewTimelogAdded() {
    this.timelogAddListenerSubs = this.timelogService.getPostAddStatusListener().subscribe(
      () => {
        let date = moment().format().split("T")[0];
        this.timelogService.getSelfTimelog(date).subscribe((resp) => {
          this.logs = resp.logs;
        })
      }
    )
  }

  getCurrentWeek() {
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('week');

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
      this.toastr.success(resp.message, "Success");
      this.getTodaysLog();
    }, (error) => {
      this.toastr.error(error.error.message, "Error")
    })
  }
}
