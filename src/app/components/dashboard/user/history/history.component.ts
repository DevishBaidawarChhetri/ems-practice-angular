import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
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
  totalWorkedHoursCount: number = 0;
  totalHoursWorkedTodayCount: number = 0;

  constructor(
    private timelogService: TimelogService,
  ) { }

  ngOnInit(): void {
    this.getCurrentWeek();
    this.initializeValues();
    setTimeout(() => {
      this.getTotalHoursWorkedToday();
      this.getTotalHoursWorkedInWeek();
    }, 500);
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

  getTotalHoursWorkedInWeek() {
    const totalHoursWorkedInMinutes = this.logs.reduce((acc, cur) => acc + cur.durationInHours, 0) * 60;
    const totalMinutesWorked = this.logs.reduce((acc, cur) => acc + cur.durationInMinutes, 0);
    const totalMinutesWorkedIncludingHours = totalHoursWorkedInMinutes + totalMinutesWorked;
    const hoursSpent = Number((totalMinutesWorkedIncludingHours / 60).toFixed(1));

    const roundOffNumber = Math.round(hoursSpent);

    // For Counter Animation
    if (roundOffNumber !== 0) {
      const totalWorkedHoursCountStop: any = setInterval(() => {
        this.totalWorkedHoursCount++;
        if (this.totalWorkedHoursCount === roundOffNumber) {
          clearInterval(totalWorkedHoursCountStop);
        }
      }, 25);
    }
  }

  getTotalHoursWorkedToday() {
    const todayDate = moment().format().split("T")[0];
    const todayLog = this.logs.filter((log) => {
      return log.date === todayDate;
    }).map((filteredLog) => {
      return filteredLog;
    })

    const totalHoursWorkedInMinutes = todayLog.reduce((acc, cur) => acc + cur.durationInHours, 0) * 60;
    const totalMinutesWorked = todayLog.reduce((acc, cur) => acc + cur.durationInMinutes, 0);
    const totalMinutesWorkedIncludingHours = totalHoursWorkedInMinutes + totalMinutesWorked;
    const hoursSpent = Number((totalMinutesWorkedIncludingHours / 60).toFixed(1));

    const roundOffNumber = Math.round(hoursSpent);

    // For Counter Animation
    if (roundOffNumber !== 0) {
      const totalWorkedHoursCountStop: any = setInterval(() => {
        this.totalHoursWorkedTodayCount++;
        if (this.totalHoursWorkedTodayCount === roundOffNumber) {
          clearInterval(totalWorkedHoursCountStop);
        }
      }, 120);
    }
  }
}
