import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  

  constructor(private http: Http, private ApiService: ApiService) { }

  url:string; 
  

  getCurrency(){
    this.url = this.ApiService.getCurrencyUrl();

    return this.http.get(`${this.url}`).pipe(map(response => { 
      return  response.json() 
    }));
      }

   
   

}
