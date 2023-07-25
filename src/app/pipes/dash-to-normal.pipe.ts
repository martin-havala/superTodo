import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashToNormal',
})
export class DashToNormalPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/-/g, ' ') ?? '';
  }
}
