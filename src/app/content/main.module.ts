import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';


import { MainRoutingModule } from './main.routing.module';

import { MainComponent } from './main.component';
import { HeaderComponent } from './templates/header/header.component';
import { InstagramWidgetComponent } from './templates/instagram-widget/instagram-widget.component';


import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactsComponent } from './contacts/contacts.component';



import { TextMaskModule } from 'angular2-text-mask';







@NgModule({
  declarations: [
    MainComponent,  
    SigninComponent,
    RegistrationComponent,
    HeaderComponent,
    InstagramWidgetComponent,
    NotFoundComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule
  ],
  exports: [
    MainComponent
  ],
  providers: []
})
export class MainModule {}