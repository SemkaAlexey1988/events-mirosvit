import { Component, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { TestComponent} from './templates/test/test.component';




@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

name: string;
surname: string;

  constructor(
    private title: Title, 
    private meta: Meta  
  ) { }

  seoTitle:string;
  ngOnInit() {
    this.seoTitle = 'You events application page';
    this.title.setTitle(this.seoTitle);
    this.meta.removeTag("name='keywords'");
    this.meta.removeTag("name='description'");
    this.meta.addTags([
  {name:'description', content: `${this.seoTitle} for plan activity`},    
  {name:'keywords', content: `events, application`}
  ]); 



this.name = 'Victor';
this.surname = 'Sanchez';

    }

    @ViewChild(TestComponent)
    private quantityComponent: TestComponent;
     
    plus() { this.quantityComponent.plus(); }
    minus() { this.quantityComponent.minus(); } 
   




}
