import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {
  users: [];
  currentPage: number = 1;
  postsPerPage: number = 5;
  totalUsers: number = 0;
  pageSizeOptions = [2, 5, 10];
  registeredUserLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllRegisteredUsers();
  }

  getAllRegisteredUsers() {
    this.registeredUserLoading = true;
    this.authService.getEmployeesWithPagination(this.currentPage, this.postsPerPage).subscribe(
      (resp) => {
        this.users = resp.users;
        this.totalUsers = resp.count;
        this.registeredUserLoading = false;
      }
    )
  }

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.getAllRegisteredUsers();
  }

  toggleAdmin(event: MatSlideToggleChange, id: string) {
    this.authService.toggleIsAdmin(event.checked, id).subscribe((resp) => {
      resp.admin
        ? this.toastr.success("Added as ADMIN.", "Success")
        : this.toastr.success("Removed as ADMIN.", "Success")
    }, (error) => {
      this.toastr.error(error.error.message, "Failed");
    })
  }
}
