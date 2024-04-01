import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// // for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// // for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
// import { LoginComponent } from './auth/login/login.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { AuthModule } from "./modules/auth/auth.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { JwtInterceptor } from "./modules/core/helpers/jwt.interceptor";
import { ErrorInterceptor } from "./modules/core/helpers/error.interceptor";
import { EmployeesModule } from "./modules/employees/employees.module";
import { FormSheetsModule } from "./modules/form-sheets/form-sheets.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    //     // for HttpClient use:
    LoadingBarHttpClientModule,
    //     // for Router use:
    LoadingBarRouterModule,
    //     // for Core use:
    LoadingBarModule,
    AuthModule,
    DashboardModule,
    EmployeesModule,
    FormSheetsModule
  ],
  providers: [
    CookieService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
