import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateconvert'
})
export class DateconvertPipe implements PipeTransform {

  transform(datefinish: string, args: string):any{

let statusDate = 'fresh';    
let convertDate = datefinish.replace(/\-/g, "");
let  convertValue = +convertDate;  

let curentDate = new Date();
let monthCurent = +curentDate.getMonth() + 1;
let dateCurent2 = `${curentDate.getFullYear()}${("0" + monthCurent).slice(-2)}${("0" + curentDate.getDate()).slice(-2)}`; 
let dateCurent = +dateCurent2; 

if(convertValue < dateCurent){
  statusDate = 'old';
}else if(convertValue == dateCurent){
  statusDate = 'middle';
}
else{
  statusDate = 'fresh';
}


    return statusDate;
  }

}
