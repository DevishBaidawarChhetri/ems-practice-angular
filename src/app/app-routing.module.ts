import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import * as components from './components/index';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/departments', pathMatch: 'full' },
  { path: 'employees', component: components.EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'departments', component: components.DepartmentComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: components.UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: components.LoginComponent },
  { path: 'signup', component: components.SignupComponent },
  { path: '**', component: components.PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
