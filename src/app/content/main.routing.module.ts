import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';


const authRoutes: Routes = [

];
@NgModule({
imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
RouterModule
  ]

})

export class MainRoutingModule {}