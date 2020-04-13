import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../Service/authentication.service';
import {Router} from '@angular/router';
import {UserService} from '../Service/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Users} from '../Models/users';

@Component({
  selector: 'app-myaccount-page',
  templateUrl: './myaccount-page.component.html',
  styleUrls: ['./myaccount-page.component.css']
})



export class MyaccountPageComponent implements OnInit {
  private user: User;
  private myForm: FormGroup;
  private validators: any;

  constructor(private authenticationService: AuthenticationService,private userService: UserService,
              private router: Router) {
    this.user=this.userService.currentUserValue.user;
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['user/login']);
    }
    console.log(this.authenticationService.currentUserValue.user);
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      // 'policyNo': new FormControl(null, this.validators.minLength(5))
      // the rest of inputs with the same approach
    });
  };

  onSubmit(){
    console.log('sdfdfg');
    console.log(this.myForm.value);
    console.log(this.user);
    this.userService.updateUser(this.user.username,this.user.phonenumber,this.user.email,this.user.city,this.user.state);

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
