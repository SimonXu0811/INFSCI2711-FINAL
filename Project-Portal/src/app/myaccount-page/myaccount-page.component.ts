import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../Service/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../Service/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Users} from '../Models/users';
import {environment} from '../../environments/environment';
import {Accidents} from '../Models/accidents';
import {AccidentService} from '../Service/accident.service';

@Component({
  selector: 'app-myaccount-page',
  templateUrl: './myaccount-page.component.html',
  styleUrls: ['./myaccount-page.component.css']
})



export class MyaccountPageComponent implements OnInit {
  private user: User;
  private myForm: FormGroup;
  private validators: any;
  private currentAdminSubject: any;
  private tempapi: string;
  private api: string;
  private accident:Accidents;

  constructor(private authenticationService: AuthenticationService,private userService: UserService,private accidentService:AccidentService,
              private router: Router) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['user/login']);
    }
    console.log(this.authenticationService.currentUserValue.user);
    this.user=this.authenticationService.currentUserValue.user;
    this.accident= new Accidents;
    // this.tempapi = sessionStorage.getItem('api');
    // if (this.tempapi) {
    //   this.api = this.tempapi;
    // } else {
    //   this.api = environment.PostgresApi;
    // }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
    });
  };


  onSubmit(){
    console.log('sdfdfg');
    console.log(this.myForm.value);
    console.log(this.user);
    this.userService.updateUser(this.user.username,this.user.phonenumber,this.user.email,this.user.city,this.user.state);
  }

  report() {
    console.log(this.accident);
    this.accidentService.reportAccident(this.user.username, this.accident.state, this.accident.city, this.accident.street, this.accident.zipcode, this.accident.visibility, this.accident.humidity,this.accident.startTime,this.accident.weathercondition)
  }
}

class User {
  id: number;
  username: string;
  password: string;
  phonenumber: string;
  email: string;
  state: string;
  city: string;
  isAdmin: boolean;
  isAnonymous: boolean;
}
