import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false //Beware about the performance. Use impure pipes only if is necessary.
})
export class SortPipe implements PipeTransform {

  transform(value: any, propName: string): any {
    return value.sort((a, b) => {
      if(a[propName] > b[propName]) {
        return 1;
      } else{
        return -1;
      }
    });
  }

}
