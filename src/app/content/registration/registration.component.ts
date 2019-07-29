import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Response } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';


import { AuthorizationService } from '../../common/services/authorization.service';
import { Countries } from '../../common/models/countries.model';
import { Gender } from '../../common/models/gender.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

  
  public mask = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  listUsers = [];

  listCountries: Countries[] = [];
  listGender: Gender[] = [];


  constructor(
    private AuthorizationService:AuthorizationService,
    private title: Title, 
    private meta: Meta  
    ) { }
  
  loadCountry: boolean;
  loadGender: boolean;
  form: FormGroup; 
  user_name: string;
  user_surname: string;
  user_email: string;
  user_phone: string;
  user_password: string;

  user_countryVal: any;
  user_country: any;

  country_code: any;
  country_codeValue: any;
  country_codeFlag: any;
  



  user_genderVal: any;
  user_gender: string;

  titleForm: string;
  buttonForm: string;
 
   nameValue:string;
   surnameValue:string;
   emailValue:string;
   phoneValue:string;
   passwordValue:string;
   id_value:number; 

   imputLength: number;
   imputLengthPhone: number;

   messageSuccess: boolean;
   gender: any; 

   seoTitle:string; 


  ngOnInit() {


    this.seoTitle = 'Registration';
    this.title.setTitle(this.seoTitle);
    this.meta.removeTag("name='keywords'");
    this.meta.removeTag("name='description'");
    this.meta.addTags([
  {name:'description', content: `${this.seoTitle} to application events`},    
  {name:'keywords', content: `events, application, ${this.seoTitle}`}
  ]); 


    this.loadCountry = false;
    this.loadGender = false;




    this.imputLength = 3;  
    this.imputLengthPhone = 30; 

    this.nameValue = "";
    this.surnameValue = "";
    this.emailValue = "";
    this.phoneValue = "";
    this.passwordValue = "";
    this.id_value = null; 

    this.titleForm = 'Registration';
    this.buttonForm = 'Save';



this.AuthorizationService
.getCountries()
.subscribe((listCountries: Countries[]) => {
this.listCountries = listCountries;
this.loadCountry = true;
this.user_countryVal = listCountries[0];
this.user_country = this.user_countryVal.country;
this.country_codeValue = this.user_countryVal.country_code;
this.country_codeFlag = this.user_countryVal.country_flag;
});

this.AuthorizationService
.getGender()
.subscribe((listGender: Gender[]) => {
this.listGender = listGender;
this.loadGender = true;
this.user_genderVal = listGender[0];
this.user_gender = this.user_genderVal.gender;

});





    this.form = new FormGroup({
      idUser: new FormControl('', ),
      name: new FormControl('', [Validators.required, this.checkMinLength.bind(this)]),
      surname: new FormControl('', [Validators.required, this.checkMinLength.bind(this)]),
      email: new FormControl('', [Validators.required, Validators.email, this.checkMinLength.bind(this)], this.existEmails.bind(this)),
      phone: new FormControl('', [Validators.required, this.checkPhoneValue.bind(this)]),
      password: new FormControl('', [Validators.required, this.checkMinLength.bind(this)]),
      country: new FormControl(this.user_country),
      gender: new FormControl(this.user_gender)
    });










  }

  ngAfterViewChecked(){
    if(this.loadGender && this.loadCountry){
    var elem = document.getElementById('g0');
    elem.setAttribute('checked', 'checked');
    }
  }

  onClickChecbox(checked){
    this.user_gender = checked.value;
  }
  onClickSelected(selected){
  this.user_country = selected;
 
  }

  onClickShow(){
    var elementary = document.querySelectorAll('.phone-code li');
    for(var i = 0; i < elementary.length; i++){
    var chiDiv = elementary[i];
    chiDiv.classList.toggle('on');
    }
  }

  onClickPhoneCode(selectedPhone){
   var elementary = document.querySelectorAll('.phone-code li');
   for(var i = 0; i < elementary.length; i++){
   var chiDiv = elementary[i];
   chiDiv.classList.remove('on');
   }
   this.country_codeValue = `+${selectedPhone.value}`; 
   this.country_code = selectedPhone.id;
   this.country_codeFlag = selectedPhone.name;
   let curentCode = document.getElementById(this.country_code);
   let curentCodeVal = curentCode.innerHTML;

   
   let imulationCode = document.getElementById('imulation');
   imulationCode.innerHTML = curentCodeVal;
    }

  
  

  
  
  
  checkMinLength(control: FormControl){
    if (control.value.length >= this.imputLength ){
        return null;
    
    }else {
      return {"shortValueError": true};
    }
      }

  checkPhoneValue(control: FormControl){
    var patterntelcart = /^(\([0-9]{3}\) [0-9]{3}\-[0-9]{4})$/i;
    var telefono = control.value;
    if (patterntelcart.test(telefono) == false) {
      return {"shortValueErrorPhone": true};
        
        }else {
          return null;
          
         
        }
          }     

    


      existEmails(control: FormControl): Promise <any> {
        return new Promise ((resolve, reject) => {
        this.AuthorizationService.getUserByEmail(control.value).subscribe((curentUser: any ) => { 
          
          if(curentUser){
        resolve({ifExistEmail: true});		
        } else {
        resolve(null);	
        }	
        });
        
        }
        
        )};


  
      onSubmit(){
        this.user_name = this.form.value.name;
        this.user_surname = this.form.value.surname;
        this.user_email = this.form.value.email;
        this.user_phone = this.country_codeValue + this.form.value.phone;
        this.user_password = this.form.value.password;
 
    
        this.AuthorizationService
    .addUser(this.user_name, this.user_surname, this.user_email, this.user_phone, this.user_password, this.user_country, this.user_gender)
    .subscribe((response) => {
    
    
      this.form = new FormGroup({
        idUser: new FormControl('', ),
        name: new FormControl('', [Validators.required, this.checkMinLength.bind(this)]),
        surname: new FormControl('', [Validators.required, this.checkMinLength.bind(this)]),
        email: new FormControl('', [Validators.required, Validators.email], this.existEmails.bind(this)),
        phone: new FormControl('', [Validators.required, this.checkPhoneValue.bind(this)]),
        password: new FormControl('', [Validators.required, this.checkMinLength.bind(this)]),
        country: new FormControl(this.user_country),
        gender: new FormControl(this.user_gender)
      });
    
    this.messageSuccess = true;
    
    setInterval(()=>{
      this.messageSuccess = false;
    },5000)
    
    
    });
    
    this.titleForm = "Registration"; 
    this.buttonForm = "Save"; 
    
    }
        


  

}
