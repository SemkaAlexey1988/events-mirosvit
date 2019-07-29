import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Response } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { EventsService } from '../../../common/services/events.service';
import { Categories } from '../../../common/models/categories.model';

import { Router } from "@angular/router";



@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss']
})
export class CategoriesMenuComponent implements OnInit {

  curentUser: any;
  curentUserId: any;

  listCategories: Categories[] = [];

  constructor(private EventsService:EventsService,private cdr: ChangeDetectorRef, private categoryRoute: Router) { }

  form: FormGroup; 
  category_name: string;
  category_description: string;

  messageSuccess: boolean;
  messageSuccessEdit: boolean;
  yCord: boolean;
  xCord: boolean;
  statusModal: boolean = false;

  nameValue:string;
  descriptionValue:string;
  id_value:number; 

  buttonForm: string;
  titleForm: string;


 




  ngOnInit() {

    this.messageSuccess = false;
    this.messageSuccessEdit = false;

    this.yCord = false;
    this.xCord = false;
    


    this.nameValue = "";
    this.descriptionValue = "";
    this.id_value = null; 

    this.curentUser = JSON.parse(window.localStorage.getItem('curentUser'));
    this.curentUserId = this.curentUser.idUser; 
   
    this.buttonForm = "Add category"; 
    this.titleForm = "Add category";


    this.EventsService
.getCategories(this.curentUserId)
.subscribe((listCategories: Categories[]) => {
this.listCategories = listCategories;


});


this.form = new FormGroup({
  idUser: new FormControl('', ),
  name: new FormControl('', Validators.required),
  description: new FormControl('', [Validators.required])

});

  }



  changeData() {

 

   

    this.EventsService
.getCategories(this.curentUserId)
.subscribe((listCategories: Categories[]) => {
this.listCategories = listCategories;


});
  } 



  onDelete(elementEl){
    
    var confirmed = confirm('Are you sure you want to delete the user?');
    if(confirmed){
    var delId = elementEl.id;  
    this.EventsService.deleteCategory(delId, this.curentUserId).subscribe((json) => {
      this.changeData();
      });
    }
    }

    ngAfterViewChecked(){
      //your code to update the model
      this.cdr.detectChanges();
   }

    
    onSubmit(){

      this.category_name = this.form.value.name;
      this.category_description = this.form.value.description;
     
if(this.id_value == null){
    
   
      
    this.EventsService
    .addCategory(this.category_name, this.category_description, this.curentUserId)
    .subscribe((response) => {

      
    
      this.changeData();
    
    this.form = new FormGroup({
      idUser: new FormControl('', ),
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required])
    });
    
    this.messageSuccess = true;
    
    setInterval(()=>{
      this.messageSuccess = false;
    },5000)
    
    
    });

    this.buttonForm = "Add category"; 
    this.titleForm = "Add category";

    this.statusModal = false;

   

  }else{
    this.EventsService
    .editCategory(this.category_name, this.category_description, this.id_value, this.curentUserId)
    .subscribe((json) => {

      this.changeData();


  
      this.form = new FormGroup({
        idUser: new FormControl('', ),
        name: new FormControl('', Validators.required),
        description: new FormControl('', [Validators.required])
      });    
  
    this.messageSuccess = false;
    this.messageSuccessEdit = true;

    this.categoryRoute.navigate(['/events']);  
    
    setInterval(()=>{
          this.messageSuccessEdit = false;
    },3000)


    
    });
    
    this.buttonForm = "Add category"; 
    this.titleForm = "Add category"; 
    this.statusModal = false;

    this.id_value = null;


  } 

    }

  /*
      reset(){
        this.form = new FormGroup({
          idUser: new FormControl('', ),
          name: new FormControl('', Validators.required),
          description: new FormControl('', [Validators.required])
        });   
        this.id_value = null;
        this.titleForm = "Add category"; 
        this.buttonForm = "Add category"; 
      }
      */

  

         

      showModal(){
        this.statusModal = true; 
        this.form = new FormGroup({
          idUser: new FormControl('', ),
          name: new FormControl('', Validators.required),
          description: new FormControl('', [Validators.required])
        
        });
      }

      closeModal(){
        this.statusModal = false;
      } 
      closeModalBlock(event){
       var clickX = event.pageX - pageXOffset;
       var clickY = event.pageY - pageYOffset;
    
      
       var ModalBlock = document.getElementById('modal-block');
       var ModalBlockCords = ModalBlock.getBoundingClientRect();
       var leftCords = ModalBlockCords.left;
       var rightCords = ModalBlockCords.right;
       var topCords = ModalBlockCords.top 
       var bottomCords = ModalBlockCords.bottom 



       if(clickX < leftCords || clickX > rightCords){    
    this.xCord = true;
    }else{
    this.xCord = false;
       }

       if(clickY < topCords || clickY > bottomCords){    
        this.yCord = true;
        }else{
        this.yCord = false;       
           }  
           
      if(this.xCord || this.yCord){
        this.statusModal = false;  
      }    

      } 

    
   


    onEdit(elementEl){

      this.statusModal = true; 
     

      this.nameValue = "";
      this.descriptionValue = "";
      this.id_value = null;  

      this.buttonForm = "Edit category"; 
    this.titleForm = "Edit category";
      
      var editId:number = elementEl.id; 
    
      this.EventsService
      .getOneCategory(elementEl.id, this.curentUserId).subscribe((json:Categories) => {
       var data = json[0]; 
       
      this.nameValue = data.name;
    this.descriptionValue = data.description;
    this.id_value = elementEl.id; 
        
      });
      
    }



}
