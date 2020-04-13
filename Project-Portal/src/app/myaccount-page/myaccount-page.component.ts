import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../Service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-myaccount-page',
  templateUrl: './myaccount-page.component.html',
  styleUrls: ['./myaccount-page.component.css']
})
export class MyaccountPageComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    // if (!this.authenticationService.currentUserValue) {
    //   this.router.navigate(['user/login']);
    // }
    // console.log(this.authenticationService.currentUserValue.user);
  }

  ngOnInit() {
  };

}
