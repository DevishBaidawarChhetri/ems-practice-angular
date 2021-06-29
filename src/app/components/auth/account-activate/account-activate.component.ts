import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-activate',
  templateUrl: './account-activate.component.html',
})
export class AccountActivateComponent implements OnInit {
  token: string = "";
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
  }

  confirmAccount() {
    this.authService.confirmAccount(this.token).subscribe(
      resp => {
        this.toastr.success(resp.message + " Please Login to continue.", "Success");
        this.router.navigate(['/login']);
      }, (error) => {
        this.toastr.error(error.error.message + " Please Login to continue.", "Error");
        this.router.navigate(['/login']);
      }
    )
  }
}
