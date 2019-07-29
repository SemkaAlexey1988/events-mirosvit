import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: Http, private ApiService: ApiService) { }

  url:string; 

 // http://api.openweathermap.org/data/2.5/weather?q=${currentCity}&APPID=d3f05ff332ee49f2fac0866c316a6130&units=metric

  getWeather(currentCity){
    this.url = this.ApiService.getWeatherUrl();
    return this.http.get(`${this.url}/data/2.5/group?id=${currentCity}&units=metric&appid=d3f05ff332ee49f2fac0866c316a6130&units=metric`).pipe(map(response => { 
      return  response.json() 
    }));
      }


}
