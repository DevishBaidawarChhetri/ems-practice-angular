import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.css']
})
export class TimelogComponent implements OnInit {
  todayDate = new FormControl(new Date());
  projects = [];
  hours: number[] = [];
  minutes: number[] = [];
  form: FormGroup;
  minutesDisabled: boolean = false;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeValue();
    this.createWorkingHours();
    this.createWorkingMinutes();
    this.initializeForm();
  }

  onDateChange(e: MatDatepickerInputEvent<Date>) {
    // console.log(e.value);
  }

  initializeValue() {
    this.projectService.getProjects().subscribe((resp) => {
      this.projects = resp.projects;
    });
  }

  createWorkingHours() {
    for (let i = 1; i <= 8; i++) {
      this.hours.push(i);
    }
  }

  createWorkingMinutes() {
    for (let i = 0; i <= 45; i = i + 15) {
      this.minutes.push(i);
    }
  }

  initializeForm(): void {
    this.form = this.fb.group({
      date: [this.todayDate.value, [Validators.required]],
      projectName: ['', [Validators.required]],
      durationInHours: [1, [Validators.required]],
      durationInMinutes: [{ value: 0, disabled: false }, [Validators.required]],
      taskSummary: ['', [Validators.required, Validators.maxLength(200)]],
    })
  }

  hourChange(hour) {
    if (hour.value === 8) {
      this.form.controls.durationInMinutes.disable();
      this.form.value.durationInMinutes = 0;
    } else {
      this.form.controls.durationInMinutes.enable();
    }
  }

  onSubmit() {
    if (this.form.invalid) { return; }
    console.log(this.form.value);
  }
}
