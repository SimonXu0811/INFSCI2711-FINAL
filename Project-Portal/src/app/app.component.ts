import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './Service/authentication.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-portal';
  constructor(public router: Router,
              private authenticationService: AuthenticationService) {
  }


  isLoginPage() {
    return this.router.url === '/user/login' || this.router.url === '/admin/dashboard' || this.router.url === '/admin/login'
      || this.router.url === '/admin/allusers' || this.router.url === '/admin/last100records' ;
  }

  changePostgreApi() {
    sessionStorage.setItem('api', 'http://localhost:8080/PostgresApi');
    // environment.PostgresApi = 'http://localhost:8080/PostgresApi';
  }

  changeMongoDBApi() {
    sessionStorage.setItem('api', 'http://localhost:8080/PostgresApi');
    // environment.PostgresApi = 'http://localhost:8080/PostgresApi';
  }


  changeNeo4jApi() {
    sessionStorage.setItem('api', 'http://localhost:8080/Neo4jApi');
    // environment.PostgresApi = 'http://localhost:8080/Neo4jApi';
  }
}
