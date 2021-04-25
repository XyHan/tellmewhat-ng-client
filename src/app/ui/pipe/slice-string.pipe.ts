import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sliceString' })
export class SliceStringPipe implements PipeTransform {
  transform(value: string, separator: string, index: number): any {
    const stringAsArray: string[] = value.split(separator);
    return stringAsArray[index];
  }
}
