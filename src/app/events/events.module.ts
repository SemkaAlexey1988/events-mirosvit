import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ckeditor4-angular';



import { ClickOutsideModule } from 'ng-click-outside';


import { EventsRoutingModule } from './events.routing.module';

import { EventsComponent } from './events.component';

import { HeaderEventsComponent } from './templates/header-events/header-events.component';
import { CategoriesMenuComponent } from './templates/categories-menu/categories-menu.component';
import { CurrencyComponent } from './templates/currency/currency.component';
import { WeatherComponent } from './templates/weather/weather.component';
import { TestComponent } from './templates/test/test.component';

import { EventsCategoryComponent } from './events-category/events-category.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FilterPipe } from '../common/pipes/filter.pipe';
import { HyphenPipe } from '../common/pipes/hyphen.pipe';
import { DateconvertPipe } from '../common/pipes/dateconvert.pipe';
import { TimeconvertPipe } from '../common/pipes/timeconvert.pipe';

import { ColorDirective } from '../common/directives/color.diretive';


@NgModule({
  declarations: [
    EventsComponent,
    HeaderEventsComponent,
    CategoriesMenuComponent,
    EventsCategoryComponent,
    CurrencyComponent,
    WeatherComponent,
    TestComponent,
    FilterPipe,
    HyphenPipe,
    DateconvertPipe,
    TimeconvertPipe,
    ColorDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    EventsRoutingModule,
    ClickOutsideModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    CKEditorModule
  ],
  exports: [
    EventsComponent,
    HeaderEventsComponent,
    CurrencyComponent,
    WeatherComponent,
    TestComponent
  ],
  providers: []
})
export class EventsModule {}