import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number, trail: string = '...'): string {
    if (!value || value.length <= limit) {
      return value;
    }
    return value.substring(0, limit) + trail;
  }
}
