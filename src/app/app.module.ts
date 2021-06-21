import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import * as components from './components/index';
import { GenderPipe } from './pipes/gender.pipe';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    components.AppComponent,
    components.EmployeeComponent,
    components.DepartmentComponent,
    components.PageNotFoundComponent,
    GenderPipe,
    components.FooterComponent,
    components.HeaderComponent,
    components.EmployeeListComponent,
    components.DepartmentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      cancelButtonType: 'danger'
    }),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [components.AppComponent],
})
export class AppModule { }
