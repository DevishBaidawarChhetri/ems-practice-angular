import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { TimelogService } from 'src/app/services/timelog.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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
  totalTimeSpentOnProject = [];
  weekDays = [];
  myChart: any;

  @ViewChild('lineChart') chartRef;

  constructor(
    private timelogService: TimelogService,
  ) { }

  ngOnInit(): void {
    this.getCurrentWeek();
    this.initializeValues();
    setTimeout(() => {
      this.getTotalHoursWorkedToday();
      this.getTotalHoursWorkedInWeek();
      this.getProjectsYouWorkedInAweek();
      this.getDataInChart();
    }, 500);
  }

  getCurrentWeek() {
    let weekStart = moment().clone().startOf('week');
    for (let i = 0; i <= 6; i++) {
      this.weekDays.push(moment(weekStart).add(i, 'days').format().split("T")[0]);
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

  getProjectsYouWorkedInAweek() {
    let arr2 = [];
    this.logs.forEach((element) => {
      // removing duplicates
      let match = arr2.find((r) => r.projectName == element.projectName);
      if (match) {
        return;
      } else {
        arr2.push({
          projectName: element.projectName,
          durationInHours: [],
          durationInMinutes: [],
        });
      }
    });

    // Mapping and adding values for same project name
    arr2.map((item) => {
      this.logs.map((e) => {
        if (e.projectName == item.projectName) {
          if (typeof e.projectName == "object") {
            e.value.map((z) => {
              item.durationInHours.push(z);
              item.durationInMinutes.push(z);
            });
          } else {
            item.durationInHours.push(e.durationInHours);
            item.durationInMinutes.push(e.durationInMinutes);
          }
        }
      });
    });

    const totalTimeSpentOnProjectArray = [];
    arr2.map((object) => {
      const totalHours = (object.durationInHours.reduce((a, b) => a + b, 0) * 60)
        + (object.durationInMinutes.reduce((a, b) => a + b, 0));
      const obj = {
        projectName: object.projectName,
        totalHours: Math.round(totalHours / 60)
      };
      totalTimeSpentOnProjectArray.push(obj);
    });

    this.totalTimeSpentOnProject = totalTimeSpentOnProjectArray;
  }

  getDataInChart() {
    this.myChart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.weekDays,
        datasets: [
          {
            label: "My Time",
            data: [8, 7, 8, 0, 0, 0, 10],
            borderColor: '#3f51b5',
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
          {
            label: "Base Time",
            data: [8, 8, 8, 8, 8, 8, 8],
            borderColor: '#a7a7a7',
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: "This week's timelog"
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Week Date'
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Hours'
            },
          }
        }
      }
    })
  }
}
