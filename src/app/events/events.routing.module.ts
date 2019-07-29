import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsComponent } from './events.component';

import { EventsCategoryComponent } from './events-category/events-category.component';

import { GuardService } from '../common/services/guard.service';




const eventsRoutes: Routes = [
 /* {path: 'events', component: EventsComponent, canActivate: [GuardService], children: [  */
 {path: 'events', component: EventsComponent, children: [  
    {path: ':id/:name', component: EventsCategoryComponent} 
]}


];
@NgModule({
imports: [
    RouterModule.forChild(eventsRoutes)
  ],
  exports: [
RouterModule
  ]

})

export class EventsRoutingModule {}