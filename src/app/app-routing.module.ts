import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import * as components from './components/index';
const routes: Routes = [
  { path: '', redirectTo: '/departments', pathMatch: 'full' },
  { path: 'employees', component: components.EmployeeComponent },
  { path: 'departments', component: components.DepartmentComponent },
  { path: 'login', component: components.LoginComponent },
  { path: 'signup', component: components.SignupComponent },
  { path: '**', component: components.PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
