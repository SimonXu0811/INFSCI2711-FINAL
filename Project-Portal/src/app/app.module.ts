import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FusionChartsModule } from "angular-fusioncharts";


import {AppComponent} from './app.component';
import {HomepageComponent} from './home-page/homepage.component';
import {UsMapModule} from 'angular-us-map';
import {LoginPageComponent} from './login-page/login-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {MyaccountPageComponent} from './myaccount-page/myaccount-page.component';
import { ForgetpasswordPageComponent } from './forgetpassword-page/forgetpassword-page.component';
import { VirtualizationPageComponent } from './virtualization-page/virtualization-page.component';

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginPageComponent,
    AlertComponent,
    RegisterPageComponent,
    MyaccountPageComponent,
    ForgetpasswordPageComponent,
    VirtualizationPageComponent
  ],
  imports: [
    BrowserModule,
    FusionChartsModule,
    AppRoutingModule,
    UsMapModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}