import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../../common/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  currentWeather;
  loadWeather:boolean; 
  currentCity;

  constructor(private WeatherService:WeatherService) { }

  ngOnInit() {
    this.loadWeather = false; 
    this.currentCity = '703448,2643743,2988507';  

    this.WeatherService
    .getWeather(this.currentCity)
    .subscribe((currentWeather) => {
    this.currentWeather = currentWeather.list;
    this.loadWeather = true;
console.log(currentWeather);

    });


  }

}
