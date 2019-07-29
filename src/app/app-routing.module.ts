import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './content/main.component';
import { RegistrationComponent } from './content/registration/registration.component';
import { SigninComponent } from './content/signin/signin.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { ContactsComponent } from './content/contacts/contacts.component';

import { GuardService } from './common/services/guard.service';



const mainRoutes: Routes = [
{path: '', component: MainComponent},
{path: 'registration', component: RegistrationComponent},
{path: 'signin', component: SigninComponent},
{path: 'contacts', component: ContactsComponent},
//{path:  '**', redirectTo: '/' }
{path:  '**', component: NotFoundComponent }
];
@NgModule({
imports: [
    RouterModule.forRoot(mainRoutes)
  ],
  exports: [
RouterModule
  ]

})

export class AppRoutingModule {}
