import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(namesList, searchString: string) {
    if(namesList.length === 0 || searchString === ''){
    return namesList;
    }

return namesList.filter(events => events.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 );

  }

}
