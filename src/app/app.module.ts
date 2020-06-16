import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {RegisterComponent} from './modules/auth/pages/register/register.component';
import {LoginComponent} from './modules/auth/pages/login/login.component';
import {SurveyComponent} from './modules/survey/survey.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastNoAnimationModule} from "ngx-toastr";
import {ContentTypeInterceptor} from "./core/interceptors/content-type.interceptor";
import {ErrorInterceptor} from "./core/interceptors/error.interceptor";
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import {PageNotFoundComponent} from "./shared/pages/page-not-found/page-not-found.component";
import {AuthService} from "./modules/auth/auth.service";
import {HttpResponseHandlerService} from "./shared/services/http-response-handler.service";
import {ToastService} from "./shared/services/toast.service";
import {AdminLayoutComponent} from "./core/layouts/admin-layout/admin-layout.component";
import { ReportComponent } from './modules/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    SurveyComponent,
    PageNotFoundComponent,
    AdminLayoutComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 4000,
      closeButton: true
    }),
  ],
  providers: [
    AuthService,
    HttpResponseHandlerService,
    ToastService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
