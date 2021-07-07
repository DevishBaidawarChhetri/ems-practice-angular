import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddTimelogComponent } from './addTimelog/addTimelog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.css']
})
export class TimelogComponent implements OnInit {

  bsModalRef: BsModalRef;
  todayDate;
  weekDays = [];
  currentMonth: string;
  currentYear: string;

  constructor(private modalService: BsModalService) { }

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

  onDateClick(weekDay) {
    console.log(weekDay);
  }
}
