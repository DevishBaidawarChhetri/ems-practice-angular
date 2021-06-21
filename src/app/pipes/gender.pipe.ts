import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, ...args): any {
    let newString = value;
    if (args[0] === "male") {
      newString = `Mr. ${value}`;
    } else {
      newString = `Mrs. ${value}`;
    }
    return newString;
  }
}
