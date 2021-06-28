import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import * as components from './components/index';
import { GenderPipe } from './pipes/gender.pipe';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { TextMaskModule } from 'angular2-text-mask';

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
    components.UpdateEmployeeComponent
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
    TextMaskModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [components.AppComponent],
})
export class AppModule { }
