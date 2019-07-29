import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

eventsUrl:string = 'https://localhost';

instagramUrl:string = `https://localhost`;
currencyUrl:string = `https://localhost`;
weatherUrl:string = `https://localhost`;


  constructor() { }


 getEventsUrl(){
   return this.eventsUrl;
 } 

 getInstagramUrl(){
  return this.instagramUrl;
}

getCurrencyUrl(){
  return this.currencyUrl;
} 
getWeatherUrl(){
  return this.weatherUrl;
} 

}
