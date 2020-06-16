import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./modules/auth/pages/login/login.component";
import {PageNotFoundComponent} from "./shared/pages/page-not-found/page-not-found.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {AuthGuard} from "./modules/auth/auth.guard";
import {AdminLayoutComponent} from "./core/layouts/admin-layout/admin-layout.component";
import {SurveyComponent} from "./modules/survey/survey.component";
import {RegisterComponent} from "./modules/auth/pages/register/register.component";
import {ReportComponent} from "./modules/report/report.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard], // Checking to see if you are logged in.
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'survey', component: SurveyComponent},
      {path: 'report', component: ReportComponent},
    ]
  },

  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
