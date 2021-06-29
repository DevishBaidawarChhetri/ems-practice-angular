import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TextMaskModule } from 'angular2-text-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import * as components from './components/index';
import { GenderPipe } from './pipes/gender.pipe';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { AuthInterceptor } from './interceptors/auth-interceptor';

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
    components.LoginComponent,
    components.SignupComponent,
    NumberOnlyDirective,
    components.UserProfileComponent,
    components.UpdateProfileComponent,
    components.UpdateDepartmentComponent,
    components.UpdateEmployeeComponent,
    components.AccountActivateComponent,
    components.ResetPasswordComponent
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
      cancelButtonType: 'danger',
    }),
    ModalModule.forRoot(),
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    TextMaskModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true,
      closeButton: true
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [components.AppComponent],
})
export class AppModule { }
