import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `https://image.tmdb.org/t/p/w500/${value}`;
  }

}
