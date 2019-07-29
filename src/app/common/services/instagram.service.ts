import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {



  constructor(private http: Http, private ApiService: ApiService) { }

  url:string; 

  getPhoto(){

    this.url = this.ApiService.getInstagramUrl();
    return this.http.get(`${this.url}`).pipe(map(response => { 
      return  response.json() 
    }));
      } 

}
