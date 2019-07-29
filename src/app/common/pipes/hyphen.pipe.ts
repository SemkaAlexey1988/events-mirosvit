import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphen'
})
export class HyphenPipe implements PipeTransform {

  transform(time: string, args: string, lengthEl: number ):any{
    if(time == ''){
var content = '';
    }else{
var content = ' - ';      
    }
var timeValue = time.substr(0, time.length - lengthEl);
    if(args=='start'){
      var returnValue = content + timeValue;
    }else if(args=='and'){
      var returnValue = timeValue + content;
    }else {
      var returnValue = timeValue;
    }

    

    return returnValue;
  }

}
