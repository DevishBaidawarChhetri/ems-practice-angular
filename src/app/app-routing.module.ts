import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import * as components from './components/index';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/departments', pathMatch: 'full' },
  { path: 'login', component: components.LoginComponent },
  { path: 'signup', component: components.SignupComponent },
  { path: 'employees', component: components.EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'departments', component: components.DepartmentComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: components.UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'registered-users', component: components.RegisteredUsersComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'auth/activate/:token', component: components.AccountActivateComponent },
  { path: 'reset-password/:token', component: components.ResetPasswordComponent },
  { path: '**', component: components.PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
