export class SigninService {
isSignin = false;

loginStatus(){
    return this.isSignin;
    }

isLogin(){
    this.isSignin = true;
}

isLogout(){
    this.isSignin = false;
    window.localStorage.clear();
}





}
