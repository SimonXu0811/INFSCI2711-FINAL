import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './home-page/homepage.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {MyaccountPageComponent} from './myaccount-page/myaccount-page.component';
import {ForgetpasswordPageComponent} from './forgetpassword-page/forgetpassword-page.component';
import {VirtualizationPageComponent} from './virtualization-page/virtualization-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomepageComponent},
  {path: 'user/login', component: LoginPageComponent},
  {path: 'user/register', component: RegisterPageComponent},
  {path: 'user/myaccount', component: MyaccountPageComponent},
  {path: 'user/forgetpassword', component: ForgetpasswordPageComponent},
  {path: 'user/virtualization', component: VirtualizationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
