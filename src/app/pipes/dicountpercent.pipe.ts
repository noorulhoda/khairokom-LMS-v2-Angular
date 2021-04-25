import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dicountpercent'
})
export class DicountpercentPipe implements PipeTransform {

  transform(value:any, ...args: unknown[]): any {
    return value+"  %";
  }

}
