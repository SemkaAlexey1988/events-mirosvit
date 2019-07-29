import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Response } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

import { AuthorizationService } from '../../common/services/authorization.service';

import { SigninService } from '../../common/services/signin.service';

import { Router } from "@angular/router";




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

  constructor(
    private AuthorizationService:AuthorizationService, 
    private SigninService:SigninService, 
    private eventsRoute: Router,
    private title: Title, 
    private meta: Meta 

    ) { }
 
  form: FormGroup;
  
  user_email: string;
  user_password: string;

  emailValue:string;
  passwordValue:string;

  titleForm: string;
  buttonForm: string;

  imputLength: number;
 
  messageInfo: string;
  messageSuccess: boolean;
  formStatus: boolean;

  seoTitle: string;

  ngOnInit() {

    this.seoTitle = 'Sign in';
    this.title.setTitle(this.seoTitle);
    this.meta.removeTag("name='keywords'");
    this.meta.removeTag("name='description'");
    this.meta.addTags([
  {name:'description', content: `${this.seoTitle} to application events`},    
  {name:'keywords', content: `events, application, ${this.seoTitle}`}
  ]);

    

  this.formStatus = true;  

  this.imputLength = 3;

  this.titleForm = 'Authorization';
  this.buttonForm = 'Sign in';

  this.messageInfo= '';

  this.emailValue = "";
  this.passwordValue = "";

  this.form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.checkMinLength.bind(this)])
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
    this.user_email = this.form.value.email;
    this.user_password = this.form.value.password;

   

    this.AuthorizationService.validateUser(this.user_email, this.user_password).subscribe((users: any ) => { 
   

      if(users){

  this.messageSuccess = true;

  window.localStorage.setItem('curentUser', JSON.stringify(users));
  this.SigninService.isLogin();
  

  this.eventsRoute.navigate(['/events']); 
  setInterval(()=>{
    this.messageSuccess = false;
  },5000)
  this.formStatus = false;  

  this.form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.checkMinLength.bind(this)])
  });

  this.messageInfo= '';  



      }else{
        this.messageInfo= 'Password or email is incorrect';
      }
        
  
      });







  }

}
