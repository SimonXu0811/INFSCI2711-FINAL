import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Accidents} from '../Models/accidents';
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AccidentService {
  private tempapi: string;
  private api: string;

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.tempapi = sessionStorage.getItem('api');
    if (this.tempapi) {
      this.api = this.tempapi;
    } else {
      this.api = environment.PostgresApi;
    }
  }

  getRoadInfo(state: string, city: string, road: string) {
    return this.http.get<Marker[]>(this.api + `/accident/accidentsByRoad/${state}/${city.trim()}/${road}`);
  }

  updateAccident(id: number, state: string, city: string, street: string, zipcode: string, latitude: string, longitude: string, visibility: number, humidity: number) {
    return this.http.put<Accidents>(this.api + `/admin/${id}`, {
      state,
      city,
      street,
      zipcode,
      latitude,
      longitude,
      visibility,
      humidity
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.userService.currentAdminValue.token
      }
    });
  }
}

interface Marker {
  latitude: number;
  longitude: number;
}
