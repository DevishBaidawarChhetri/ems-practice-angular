import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  canActivate() {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin == "true") {
      return true;
    }
    this.router.navigate(['/employees']);
    return false;
  }

}
