import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { SigninService } from "./signin.service";
import { Injectable } from "@angular/core";

@Injectable()
export class GuardService implements CanActivate, CanActivateChild {
constructor(private signin: SigninService, private redirectRoute: Router){}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

var statusRoute = this.signin.loginStatus();

 if(!statusRoute){
    this.redirectRoute.navigate(['/signin']); 
    return false;
    }else {   
    return true;
    }

    

}  

canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

 return this.canActivate(childRoute, state);  
    
    
    
    } 

}