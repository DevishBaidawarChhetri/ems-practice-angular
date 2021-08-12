import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../../../services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
})
export class UpdateProjectComponent implements OnInit {
  project: any;
  form: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      projectName: ['', [Validators.required]],
    })

    this.form.setValue({
      projectName: this.project.projectName
    })
  }

  updateProject() {
    if (this.form.invalid) { return; }

    this.projectService.updateProject(this.project._id, this.form.value).subscribe((res) => {
      if (res) {
        this.bsModalRef.hide();
        this.form.reset();
      }
      this.toastr.success(res.message, 'Success')
    }, (error) => {
      this.toastr.error(error.error.message, 'Failed')
    });
  }
}
