import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false //Se debe tener cuidado con la pureza del pipe. Si se hace "impuro", éste se va a ejecutar cada vez que parte del DOM que
              //esté relacionado con este pipe sufra algún cambio, como agregar un nuevo servidor por ejemplo. Esto puede repercutir
              //considerablemente con el performance. Así que, hacerlo impuro solo si es extrictamente necesario.
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if(value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for(const item of value) {
      if(item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
