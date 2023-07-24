import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToNormal'
})
export class CamelToNormalPipe implements PipeTransform {

  transform(value: string): string {
    return value.replaceAll(/([A-Z])/g,' $1').toLocaleLowerCase();
  }

}
