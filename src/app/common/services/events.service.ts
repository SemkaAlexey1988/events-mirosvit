import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Gender } from '../models/gender.model';

import {ApiService} from './api.service';



@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: Http, private ApiService: ApiService) {}
  url:string;
  urlCategories:string = 'categories';
  urlCategory:string = 'category';
  urlEvents:string = 'events';
  urlEventsort:string = 'eventsort';




  getCategories(userId: string){
    this.url = this.ApiService.getEventsUrl();
    return this.http.get(`${this.url}/${this.urlCategories}/${userId}`).pipe(map(response => { 
      return  response.json() 
    }));
      }

      addCategory(category_name, category_description, curentUserId){
        this.url = this.ApiService.getEventsUrl();

        const data = {
          category_name: category_name,
          category_description: category_description,
          user_id: curentUserId
        }

        console.log(data);
        
        return this.http.post(`${this.url}/${this.urlCategories}`, data ).pipe(map((response: Response) => {	
        return response;
        }));
        }     

        deleteCategory(id, userId){
          this.url = this.ApiService.getEventsUrl();        
	return this.http.delete(`${this.url}/${this.urlCategories}/${id}/${userId}`).pipe(map((response: Response) => {
            return response;
            }));
        } 

      

getOneCategory(id, userId){
  this.url = this.ApiService.getEventsUrl();
        return this.http.get(`${this.url}/${this.urlCategory}/${id}/${userId}`).pipe(map((response: Response) => {
        
        return response.json();	
        }));	
        }

editCategory(category_name, category_description, idValue, curentUserId){
  this.url = this.ApiService.getEventsUrl();

          const data = {
            category_name: category_name,
            category_description:  category_description
          }
       
          return this.http.put(`${this.url}/${this.urlCategories}/${idValue}/${curentUserId}`, data ).pipe(map((response: Response) => {
          return response;	
          }));
          } 


getEvents(id, userId){
  this.url = this.ApiService.getEventsUrl();
return this.http.get(`${this.url}/${this.urlEvents}/${id}/${userId}`).pipe(map(response => { 
return  response.json() 
}));
}

getSortEvents(id, userId, sortValue){
  this.url = this.ApiService.getEventsUrl();
  return this.http.get(`${this.url}/${this.urlEventsort}/${id}/${userId}/${sortValue}`).pipe(map(response => { 
  return  response.json() 
  }));
  }


deleteEvent(delId, id, userId){
  this.url = this.ApiService.getEventsUrl();
                return this.http.delete(`${this.url}/${this.urlEvents}/${delId}/${id}/${userId}`).pipe(map((response: Response) => {
                          return response;
                          }));
                      } 
addEvent(event_name, event_description, event_start, event_startTime, event_finish, event_finishTime, event_status, sort_by_date, curentUserId, id){
  this.url = this.ApiService.getEventsUrl();
  
  const data = {
                          event_name: event_name,
                          event_description: event_description,
                          event_start: event_start,
                          event_startTime: event_startTime,
                          event_finish: event_finish,
                          event_finishTime: event_finishTime,
                          event_status: event_status,
                          sort_by_date: sort_by_date,
                          user_id: curentUserId,
                          id: id
                        }
                
                      //  console.log(data);
                      console.log(`data - ${data.event_status}`);  
                        return this.http.post(`${this.url}/${this.urlEvents}`, data ).pipe(map((response: Response) => {	
                        return response;
                        }));
                        } 

editEvent(event_name, event_description, event_start, event_startTime, event_finish, event_finishTime, event_status, sort_by_date, idValue, id, curentUserId){
  this.url = this.ApiService.getEventsUrl();
  const data = {
    event_name: event_name,
    event_description: event_description,
    event_start: event_start,
    event_startTime: event_startTime,
    event_finish: event_finish,
    event_finishTime: event_finishTime,
    event_status: event_status,
    sort_by_date: sort_by_date
  }

 
                
  return this.http.put(`${this.url}/${this.urlEvents}/${idValue}/${id}/${curentUserId}`, data ).pipe(map((response: Response) => {
                          return response;	
                          }));
                          } 
                          
getOneEvent(elementEl, id, userId){
  this.url = this.ApiService.getEventsUrl();
  console.log(`${this.url}/${this.urlEvents}/${elementEl}/${id}/${userId}`);
                            return this.http.get(`${this.url}/${this.urlEvents}/${elementEl}/${id}/${userId}`).pipe(map((response: Response) => {
                          
                            return response.json();	
                            }));	
                            }                          



}
