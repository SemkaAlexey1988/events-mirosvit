import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeconvert'
})
export class TimeconvertPipe implements PipeTransform {

  transform(timefinish: string, args: string):any{

let statusTime = 'future';    
let convertTime = timefinish.replace(/\:/g, "");
let eventconvertTime = convertTime.substring(convertTime.length - 2, convertTime.length); 
convertTime = convertTime.substring(0, convertTime.length - 3);

if(eventconvertTime == 'am'){
  var convertTime2 = `1${convertTime}`;
  }else{
  var convertTime2 = `2${convertTime}`;  
  }

let  convertValue = +convertTime2;  

let curentTime = new Date();
var hours = curentTime.getHours();
var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; 

if(hours > 12){
  var hoursValue = hours - 12;
}else {
  var hoursValue = hours;
}    

  if(ampm == 'am'){
    var tp = `1`;
    }else{
    var tp = `2`; 
    }


let timeCurent2 = `${tp}${("0" + hoursValue).slice(-2)}${("0" + curentTime.getMinutes()).slice(-2)}`; 
let timeCurent = +timeCurent2; 




if(convertValue < timeCurent){
  statusTime = 'past';
}else{
  statusTime = 'future';
}


    return statusTime;
  }

}
