import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddTimelogComponent } from './addTimelog/addTimelog.component';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.css']
})
export class TimelogComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(AddTimelogComponent, {});
  }
}
