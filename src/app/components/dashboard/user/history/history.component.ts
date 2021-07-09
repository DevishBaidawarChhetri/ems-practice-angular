import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { delay } from 'rxjs/operators';
import { TimelogService } from 'src/app/services/timelog.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  startdate: string;
  enddate: string;
  userId: string = localStorage.getItem('userId');
  logs = [];
  totalWorkedHours: number;

  constructor(
    private timelogService: TimelogService,
  ) { }

  ngOnInit(): void {
    this.getCurrentWeek();
    this.initializeValues();
    setTimeout(() => {
      this.getTotalHoursWorked();
    }, 500)
  }

  getCurrentWeek() {
    let weekStart = moment().clone().startOf('week');
    for (let i = 0; i <= 6; i++) {
      const weekDay = moment(weekStart).add(i, 'days').format().split("T")[0];
      i === 0
        ? this.startdate = weekDay
        : i === 6
          ? this.enddate = weekDay
          : ''
    }
  }

  initializeValues() {
    this.timelogService
      .getWeeksLog(this.userId, this.startdate, this.enddate)
      .subscribe((resp) => {
        this.logs = resp.weeklyLogs;
      })
  }

  getTotalHoursWorked() {
    const totalHoursWorkedInMinutes = this.logs.reduce((acc, cur) => acc + cur.durationInHours, 0) * 60;
    const totalMinutesWorked = this.logs.reduce((acc, cur) => acc + cur.durationInMinutes, 0);
    const totalMinutesWorkedIncludingHours = totalHoursWorkedInMinutes + totalMinutesWorked;
    const hoursSpent = Number((totalMinutesWorkedIncludingHours / 60).toFixed(1));
    this.totalWorkedHours = hoursSpent;
  }
}
