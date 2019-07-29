import { Component, OnInit } from '@angular/core';

import { InstagramService } from '../../../common/services/instagram.service';

@Component({
  selector: 'app-instagram-widget',
  templateUrl: './instagram-widget.component.html',
  styleUrls: ['./instagram-widget.component.scss']
})
export class InstagramWidgetComponent implements OnInit {

  loadWidget:boolean;
  curentPhoto; 
  

  constructor(private InstagramService:InstagramService) { }

  ngOnInit() {
   
    this.loadWidget = false;  

    this.InstagramService
    .getPhoto()
    .subscribe((curentPhoto) => {
    this.curentPhoto = curentPhoto.data;
   // console.log(this.curentPhoto);
   this.loadWidget = true;
    });


  }

}
