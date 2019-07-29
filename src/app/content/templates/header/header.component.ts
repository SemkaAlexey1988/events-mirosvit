import { Component, OnInit } from '@angular/core';

import { Users } from 'src/app/common/models/users.model';
import { SigninService } from 'src/app/common/services/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  curentUser: any;
  userName: string;
  userSurname: string;
  status: boolean = false;
  showAuthorizationInfo: boolean;
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
      this.showAuthorizationInfo = false;
      this.showUserInfo = true;
    }else{
      this.userName = '';
      this.userSurname = '';
      this.showAuthorizationInfo = true;
      this.showUserInfo = false;
    }
  }

  logOut(){
    this.SigninService.isLogout();
    this.routerMain.navigate(['/signin']);
    this.userName = '';
    this.userSurname = '';
    this.showAuthorizationInfo = true;
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
