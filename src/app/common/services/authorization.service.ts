import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';
import { Countries } from '../models/countries.model';
import { Gender } from '../models/gender.model';

import {ApiService} from './api.service';



@Injectable({
  providedIn: 'root'
})
export class AuthorizationService  {

  constructor(private http: Http, private ApiService: ApiService) {}

  url:string;
  urlUsers:string = 'users';
  urlEmail:string = 'useremail';
  urlContacts:string = 'contacts';
  urlCountries:string = 'countries';
  urlGender:string = 'gender';
  urlValidate:string = 'uservalid';
  urlQuestion:string = 'questions';
 
  




  getContacts(){

    this.url = this.ApiService.getEventsUrl();
    return this.http.get(`${this.url}/${this.urlContacts}`).pipe(map(response => {  

      return  response.json() 
    }));
      }

addMessage(userName, userEmail, userMessage ){

  this.url = this.ApiService.getEventsUrl();
        this.url = this.ApiService.getEventsUrl();
    
        const data = {
          userName: userName,
          userEmail: userEmail,
          userMessage: userMessage
         
        }

        
    
    
        
        return this.http.post(`${this.url}/${this.urlQuestion}`, data ).pipe(map((response: Response) => {
      
        return response;
        }));
        }      

  

  getCountries(){

    this.url = this.ApiService.getEventsUrl();
    return this.http.get(`${this.url}/${this.urlCountries}`).pipe(map(response => { 
      
      

      return  response.json() 
    }));
      }

      getGender(){
        this.url = this.ApiService.getEventsUrl();
        return this.http.get(`${this.url}/${this.urlGender}`).pipe(map(response => { 
          return  response.json() 
        }));
          }   

  addUser(user_name, user_surname, user_email, user_phone, user_password, user_country, user_gender ){
    this.url = this.ApiService.getEventsUrl();

    const data = {
      user_name: user_name,
      user_surname: user_surname,
      user_email: user_email,
      user_phone: user_phone,
      user_password: user_password,
      user_country: user_country,
      user_gender: user_gender
    }


    
    return this.http.post(`${this.url}/${this.urlUsers}`, data ).pipe(map((response: Response) => {
	
    return response;
    }));
    } 




    getUserByEmail(email: string): Observable<Users> {

      this.url = this.ApiService.getEventsUrl();

      return this.http.get(`${this.url}/${this.urlEmail}/${email}`).pipe(map(
        (response: Response) => 
        response.json())).pipe(map((users: Users[]) => users[0] ? users[0] : undefined));
      
    
    }


    validateUser(email: string, password: string): Observable<Users> {

      this.url = this.ApiService.getEventsUrl();

      return this.http.get(`${this.url}/${this.urlValidate}/${email}/${password}`).pipe(map(
        (response: Response) => 
        response.json())).pipe(map((users: Users[]) => users[0] ? users[0] : undefined));
      
    
    }
    


}
