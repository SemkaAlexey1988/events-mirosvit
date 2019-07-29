import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

import { AuthorizationService } from '../../common/services/authorization.service';
import { Contacts } from '../../common/models/contacts.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

 pageContacts: Contacts[] = [];
 pageContactsValue: any;
 seoTitle:string; 

  constructor(
    private AuthorizationService:AuthorizationService,
    private title: Title, 
    private meta: Meta    
  ) { }

  loadContacts: boolean;
  messageSuccess: boolean;
  imputLength: number;
  form: FormGroup; 

  titleForm: string;
  buttonForm: string;

  nameValue:string;
  emailValue:string;
  messageValue:string;
  error:any;

userName:string;
userEmail:string;
userMessage:string;


  ngOnInit() {

    this.nameValue = "";
    this.emailValue = "";
    this.messageValue = "";

    this.titleForm = 'Contact us';
    this.buttonForm = 'Sеnd';

    this.messageSuccess = false;



    this.seoTitle = 'Contact us';
    this.title.setTitle(this.seoTitle);
    this.meta.removeTag("name='keywords'");
    this.meta.removeTag("name='description'");
    this.meta.addTags([
  {name:'description', content: `${this.seoTitle} using form or email`},    
  {name:'keywords', content: `events, application, ${this.seoTitle}`}
  ]); 

  this.imputLength = 3; 

    this.AuthorizationService
    .getContacts()
    .subscribe((pageContacts: Contacts[]) => {
      
    this.pageContacts = pageContacts;
    this.loadContacts = true;
    this.pageContactsValue = pageContacts[0];
    console.log(this.pageContactsValue);
    },
    error => {this.error = error.message; console.log(error);});



    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, this.checkMinLength.bind(this), Validators.pattern("[a-zA-Zа-яА-Я- ]{2,30}")]),
      email: new FormControl('', [Validators.required, Validators.email, this.checkMinLength.bind(this)]),
      message: new FormControl('', [Validators.required])
    });




  }


  checkMinLength(control: FormControl){
    if (control.value.length >= this.imputLength ){
        return null;
    
    }else {
      return {"shortValueError": true};
    }
      }  

      onSubmit(){
//console.log(this.form);
this.userName = this.form.value.name;
this.userEmail = this.form.value.email;
this.userMessage = this.form.value.message;



this.AuthorizationService
.addMessage(this.userName, this.userEmail, this.userMessage)
.subscribe((response) => {


  this.form = new FormGroup({
    name: new FormControl('', [Validators.required, this.checkMinLength.bind(this), Validators.pattern("[a-zA-Zа-яА-Я- ]{2,30}")]),
    email: new FormControl('', [Validators.required, Validators.email, this.checkMinLength.bind(this)]),
    message: new FormControl('', [Validators.required])
  });

this.messageSuccess = true;

setInterval(()=>{
  this.messageSuccess = false;
},5000)


},
error => {this.error = error.message; console.log(error);});


      }


}
