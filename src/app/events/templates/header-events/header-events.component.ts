import { Component, OnInit } from '@angular/core';

import { Users } from 'src/app/common/models/users.model';
import { SigninService } from 'src/app/common/services/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-events',
  templateUrl: './header-events.component.html',
  styleUrls: ['./header-events.component.scss']
})
export class HeaderEventsComponent implements OnInit {

  curentUser: any;
  userName: string;
  userSurname: string;
  status: boolean = false;
  showUserInfo: boolean;

  constructor(
    private SigninService:SigninService,
    private routerMain:Router
  ) { }

  ngOnInit() {
    this.curentUser = JSON.parse(window.localStorage.getItem('curentUser'));
    if(this.curentUser){
      this.userName = this.curentUser.name;
      this.userSurname = this.curentUser.surname;
      this.showUserInfo = true;
    }else{
      this.userName = '';
      this.userSurname = '';
      this.showUserInfo = false;
    }
  }

  logOut(){
    this.SigninService.isLogout();
    this.routerMain.navigate(['/signin']);
    this.userName = '';
    this.userSurname = '';
    this.showUserInfo = false;
  }

  toggleMenu(mobileMenu){
    this.status = !this.status; 

  }
  
  
   onClickedOutside(e: Event) {
   if(this.status == true){
      console.log('Clicked outside:', e);
      this.status = false;
    }
    }


}
