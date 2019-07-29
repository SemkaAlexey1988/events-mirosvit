import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';






import { EventsService } from '../../common/services/events.service';
import { Categories } from '../../common/models/categories.model';
import { Event } from '../../common/models/event.model';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-events-category',
  templateUrl: './events-category.component.html',
  styleUrls: ['./events-category.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class EventsCategoryComponent implements OnInit {

  constructor(private curentRoute: ActivatedRoute, private router: Router, private EventsService:EventsService, private cdr: ChangeDetectorRef) { }

  
  searchName = '';
  
  curentUser: any;
  curentUserId: any;

  listCategories: Categories;

  listEvents: Event[] = [];

  id: number;
  name: string;
  load: boolean;

  form: FormGroup; 
  event_name: string;
  event_description: string;
  event_start: string;
  event_startTime: string;
  event_finish: string;
  event_finishTime: string;
  event_status: number;

  messageSuccess: boolean;
  messageSuccessEdit: boolean;
  yCord: boolean;
  xCord: boolean;
  statusModal: boolean = false;

  nameValue:string;
  descriptionValue:string;
  eventstartValue: string;
  eventstartTimeValue: string;
  eventfinishValue: string;
  eventfinishTimeValue: string;
  eventStatus: number;
  id_value:number; 
  sort_by_date:number;

  buttonForm: string;
  titleForm: string;
  minDate;
  dateCurent;

  sortValue: string;
  curentSort: string;


  ngOnInit() {

    this.load = false;

    this.id = +this.curentRoute.snapshot.params['id'];
    this.name = this.curentRoute.snapshot.params['name'];

    this.curentUser = JSON.parse(window.localStorage.getItem('curentUser'));
    this.curentUserId = this.curentUser.idUser; 

    this.buttonForm = "Add event"; 
    this.titleForm = "Add event";


    this.messageSuccess = false;
    this.messageSuccessEdit = false;

    this.yCord = false;
    this.xCord = false;

    this.nameValue = "";
    this.descriptionValue = "";
    this.eventstartValue = "";
    this.eventstartTimeValue = "";
    this.eventfinishValue = "";
    this.eventfinishTimeValue = "";
    this.id_value = null; 

    

    this.minDate = new Date();

    this.form = new FormGroup({
      idUser: new FormControl('', ),
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      eventstart: new FormControl('', []),
      eventstartpicker: new FormControl('', [Validators.required]),
      eventstarttime: new FormControl('', []),
      eventfinish: new FormControl('', []),
      eventfinishpicker: new FormControl('', [Validators.required]),
      eventfinishtime: new FormControl('', []),
      statusevent: new FormControl('', [])
    });

 
    

  



    this.EventsService
    .getOneCategory(this.id, this.curentUserId)
    .subscribe((listArticles: Categories) => {
    this.listCategories = listArticles[0];

    

 // console.log(this.listCategories);
  this.load = true;
    });


    let curentDate = new Date();
    let dateCurent2 = `${curentDate.getHours()}${curentDate.getMinutes()}`; 
    console.log(dateCurent2);


    this.EventsService
    .getEvents(this.id, this.curentUserId)
    .subscribe((listEvents: Event[]) => {
    this.listEvents = listEvents;
    });

    

    this.curentRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.name = params['name'];

      this.EventsService
      .getOneCategory(this.id, this.curentUserId)
      .subscribe((listArticles: Categories) => {
      this.listCategories = listArticles[0];
      this.load = true;
      });

  this.EventsService
      .getEvents(this.id, this.curentUserId)
      .subscribe((listEvents: Event[]) => {
      this.listEvents = listEvents;
    // console.log(this.listEvents);
      });



     
    });

    this.curentSort = "";    
    console.log(this.curentSort);

  }






  onSortSelected(selected){
    
    this.sortValue = selected;
    window.localStorage.setItem('selectedSort', JSON.stringify(this.sortValue));
    this.curentSort = JSON.parse(window.localStorage.getItem('selectedSort'));
  

  this.EventsService
  .getSortEvents(this.id, this.curentUserId, this.curentSort)
  .subscribe((listEvents: Event[]) => {
  this.listEvents = listEvents;
  
  });


    }




  clearInput(searchInput){
    searchInput.placeholder="";
  }


  changeData() {
if(this.curentSort == ""){
  this.EventsService
  .getEvents(this.id, this.curentUserId)
  .subscribe((listEvents: Event[]) => {
  this.listEvents = listEvents;
  });
}else{
  this.EventsService
  .getSortEvents(this.id, this.curentUserId, this.curentSort)
  .subscribe((listEvents: Event[]) => {
  this.listEvents = listEvents;
  
  });
}

  } 
  
  onDelete(elementEl){
    
    var confirmed = confirm('Are you sure you want to delete the user?');
    if(confirmed){
    var delId = elementEl.id;  
    this.EventsService.deleteEvent(delId, this.id, this.curentUserId).subscribe((json) => {
      this.changeData();
      });
    }
    }

    onClickChecbox(checked){
      if(checked.value == 0){
        this.event_status = 1; 
      }else{
        this.event_status = 0; 
      }
     
      console.log(this.event_status);
    } 

    ngAfterViewChecked(){
      //your code to update the model
      this.cdr.detectChanges();
   }

   
    onSubmit(){

     
if(this.id_value == null){

  
  var convertDateStart = new Date(this.form.value.eventstartpicker);
  var convertDateFinish = new Date(this.form.value.eventfinishpicker);
  var monthStart = +convertDateStart.getMonth() + 1;
  var monthFinish = +convertDateFinish.getMonth() + 1;
  var dateStart = `${convertDateStart.getFullYear()}-${("0" + monthStart).slice(-2)}-${("0" + convertDateStart.getDate()).slice(-2)}`; 
  var dateFinish = `${convertDateFinish.getFullYear()}-${("0" + monthFinish).slice(-2)}-${("0" + convertDateFinish.getDate()).slice(-2)}`;   

  this.event_name = this.form.value.name;
  this.event_description = this.form.value.description;
  this.event_start = dateStart;
  this.event_startTime = this.form.value.eventstarttime;
  this.event_finish = dateFinish;
  this.event_finishTime = this.form.value.eventfinishtime;

  var compareStart = this.event_start.replace(/\-/g, "");
  var compareStart2 = +compareStart;

  var compareFinish = this.event_finish.replace(/\-/g, "");
  var compareFinish2 = +compareFinish;


  if(compareStart2 > compareFinish2){
    this.event_start = this.event_finish; 
  }

  this.event_startTime = this.form.value.eventstarttime;
  var eventPeriodStartTime = this.event_startTime.substring(this.event_startTime.length - 2, this.event_startTime.length);    
  var eventStartTime = this.event_startTime.substring(0, this.event_startTime.length - 3);
  var eventStartTime = eventStartTime.replace(/\:/g, "");
  if(eventPeriodStartTime == 'am'){
  var startTime = `1${eventStartTime}`;
  }else{
  var startTime = `2${eventStartTime}`;  
  }
  var startTime2 = +startTime;
  
  
  this.event_finishTime = this.form.value.eventfinishtime;
  var eventPeriodFinishTime = this.event_finishTime.substring(this.event_finishTime.length - 2, this.event_finishTime.length);    
  var eventFinishTime = this.event_finishTime.substring(0, this.event_finishTime.length - 3);
  var eventFinishTime = eventFinishTime.replace(/\:/g, "");
  if(eventPeriodFinishTime == 'am'){
  var finishTime = `1${eventFinishTime}`;
  }else{
  var finishTime = `2${eventFinishTime}`;  
  }
  var finishTime2 = +finishTime;

  if(compareStart2 == compareFinish2){
if(startTime2 > finishTime2){
  this.event_startTime =  this.event_finishTime;
}
}
    
if(startTime == "1" || startTime == "2"){
  var stTime = "00000";
  }else{
    var stTime = startTime;
  }
  
  var sort_by_date2 = compareStart + stTime;
  this.sort_by_date = +sort_by_date2;


  this.event_status = this.eventStatus;

    this.EventsService
    .addEvent(this.event_name, this.event_description, this.event_start, this.event_startTime, this.event_finish, this.event_finishTime, this.event_status, this.sort_by_date, this.curentUserId, this.id)
    .subscribe((response) => {

      
    
      this.changeData();
    
      this.form = new FormGroup({
        idUser: new FormControl('', ),
        name: new FormControl('', Validators.required),
        description: new FormControl('', [Validators.required]),
        eventstart: new FormControl('', []),
        eventstartpicker: new FormControl('', [Validators.required]),
        eventstarttime: new FormControl('', []),
        eventfinish: new FormControl('', []),
      eventfinishpicker: new FormControl('', [Validators.required]),
      eventfinishtime: new FormControl('', []),
      statusevent: new FormControl('', [])
      });
    
    this.messageSuccess = true;
    
    setInterval(()=>{
      this.messageSuccess = false;
    },5000)
    
    
    });

    this.buttonForm = "Add event"; 
    this.titleForm = "Add event";

    this.statusModal = false;
    this.sort_by_date = null;
    this.event_status = 0;

   

  }else{

 var convertDateStart = new Date(this.form.value.eventstartpicker);
 var convertDateFinish = new Date(this.form.value.eventfinishpicker);

 var monthStart = +convertDateStart.getMonth() + 1;
 var monthFinish = +convertDateFinish.getMonth() + 1;

 var dateStart = `${convertDateStart.getFullYear()}-${("0" + monthStart).slice(-2)}-${("0" + convertDateStart.getDate()).slice(-2)}`; 
 var dateFinish = `${convertDateFinish.getFullYear()}-${("0" + monthFinish).slice(-2)}-${("0" + convertDateFinish.getDate()).slice(-2)}`; 


    this.event_name = this.form.value.name;
    this.event_description = this.form.value.description;
    if(this.form.value.eventstartpicker == ''){
  this.event_start = this.form.value.eventstart;
    }else{
    this.event_start = dateStart;
    }



    if(this.form.value.eventfinishpicker == ''){
      
      this.event_finish = this.form.value.eventfinish;
        }else{
        this.event_finish = dateFinish;
        }
  this.event_finishTime = this.form.value.eventfinishtime;

 

  var compareStart = this.event_start.replace(/\-/g, "");
  var compareStart2 = +compareStart;

  var compareFinish = this.event_finish.replace(/\-/g, "");
  var compareFinish2 = +compareFinish;


  if(compareStart2 > compareFinish2){
    this.event_start = this.event_finish; 
  }




  this.event_startTime = this.form.value.eventstarttime;
  var eventPeriodStartTime = this.event_startTime.substring(this.event_startTime.length - 2, this.event_startTime.length);    
  var eventStartTime = this.event_startTime.substring(0, this.event_startTime.length - 3);
  var eventStartTime = eventStartTime.replace(/\:/g, "");
  if(eventPeriodStartTime == 'am'){
  var startTime = `1${eventStartTime}`;
  }else{
  var startTime = `2${eventStartTime}`;  
  }
  var startTime2 = +startTime;
  
  
  this.event_finishTime = this.form.value.eventfinishtime;
  var eventPeriodFinishTime = this.event_finishTime.substring(this.event_finishTime.length - 2, this.event_finishTime.length);    
  var eventFinishTime = this.event_finishTime.substring(0, this.event_finishTime.length - 3);
  var eventFinishTime = eventFinishTime.replace(/\:/g, "");
  if(eventPeriodFinishTime == 'am'){
  var finishTime = `1${eventFinishTime}`;
  }else{
  var finishTime = `2${eventFinishTime}`;  
  }
  var finishTime2 = +finishTime;

  if(compareStart2 == compareFinish2){
if(startTime2 > finishTime2){
  this.event_startTime =  this.event_finishTime;
}
} 



if(startTime == "1" || startTime == "2"){
var stTime = "00000";
}else{
  var stTime = startTime;
}

var sort_by_date2 = compareStart + stTime;
this.sort_by_date = +sort_by_date2;
this.event_status = this.eventStatus;


    this.EventsService
    .editEvent(this.event_name, this.event_description, this.event_start, this.event_startTime, this.event_finish, this.event_finishTime, this.event_status, this.sort_by_date, this.id_value, this.id, this.curentUserId)
    .subscribe((json) => {
   
      this.changeData();
  
      this.form = new FormGroup({
        idUser: new FormControl('', ),
        name: new FormControl('', Validators.required),
        description: new FormControl('', [Validators.required]),
        eventstart: new FormControl('', []),
        eventstartpicker: new FormControl('', [Validators.required]),
        eventstarttime: new FormControl('', []),
        eventfinish: new FormControl('', []),
        eventfinishpicker: new FormControl('', [Validators.required]),
        eventfinishtime: new FormControl('', []),
        statusevent: new FormControl('', [])
      });   
  
    this.messageSuccess = false;
    this.messageSuccessEdit = true;
    
    setInterval(()=>{
          this.messageSuccessEdit = false;
    },5000)


    
    });
    
    this.buttonForm = "Add event"; 
    this.titleForm = "Add event"; 
    this.statusModal = false;

    this.id_value = null;
    this.sort_by_date = null;
    this.event_status = 0;


  } 

    } 

    
      
    
    showModal(){
      this.statusModal = true; 
      this.eventStatus = 0;

      this.form = new FormGroup({
        idUser: new FormControl('', ),
        name: new FormControl('', Validators.required),
        description: new FormControl('', [Validators.required]),
        eventstart: new FormControl('', []),
        eventstartpicker: new FormControl('', [Validators.required]),
        eventstarttime: new FormControl('', []),
        eventfinish: new FormControl('', []),
      eventfinishpicker: new FormControl('', [Validators.required]),
      eventfinishtime: new FormControl('', []),
      statusevent: new FormControl('', [])
      });  
    }

    closeModal(){
      this.statusModal = false;
    } 
    closeModalBlock(event){
     var clickX = event.pageX - pageXOffset;
     var clickY = event.pageY - pageYOffset;
     var ModalBlock = document.getElementById('modal-block-second');
     var ModalBlockCords = ModalBlock.getBoundingClientRect();
     var leftCords = ModalBlockCords.left;
     var rightCords = ModalBlockCords.right;
     var topCords = ModalBlockCords.top;
     var bottomCords = ModalBlockCords.bottom;
     if(clickX < leftCords || clickX > rightCords){    
  this.xCord = true;
  }else{
  this.xCord = false;
     }

     if(clickY < topCords || clickY > bottomCords){    
      this.yCord = true;
      }else{
      this.yCord = false;       
         }  
         
    if(this.xCord || this.yCord){
      this.statusModal = false;  
    }    

    }     
    

    
    onEdit(elementEl){

      this.form = new FormGroup({
        idUser: new FormControl('', ),
        name: new FormControl('', Validators.required),
        description: new FormControl('', [Validators.required]),
        eventstart: new FormControl('', []),
        eventstartpicker: new FormControl('', []),
        eventstarttime: new FormControl('', []),
        eventfinish: new FormControl('', []),
      eventfinishpicker: new FormControl('', []),
      eventfinishtime: new FormControl('', []),
      statusevent: new FormControl('', [])
      });  

      

      this.statusModal = true; 
     

      this.nameValue = "";
      this.descriptionValue = "";
      this.eventstartValue = "";
      this.eventstartTimeValue = "";
      this.eventfinishValue = "";
      this.eventfinishTimeValue = "";
      this.id_value = null;  

      this.buttonForm = "Edit event"; 
    this.titleForm = "Edit event";
      
      var editId:number = elementEl.id; 
    
      this.EventsService
      .getOneEvent(elementEl.id, this.id, this.curentUserId).subscribe((json:Categories) => {
       var data = json[0]; 
       
      
       
    this.nameValue = data.name;
    this.descriptionValue = data.description;
    this.eventstartValue = data.date_start;
    this.eventstartTimeValue = data.time_start;
    this.eventfinishValue = data.date_finish;
    this.eventfinishTimeValue = data.time_finish;
    this.eventStatus = data.status;
    this.id_value = elementEl.id; 
        
      });
      
    }    
    
    


}
