import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'renamer'
})
export class RenamerPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if(value === 'IS_BEING_PROCESSED') return 'Is Being Processed'
    if(value === 'IS_COMPLETED') return 'Is Completed'
    if(value ==  'IN_TRANSIT') return 'In Transit'
    if(value === 'AT_THE_DESTINATION') return "At The Distanation"
    if(value === 'RECEIVED') return "Received"


    return value;
  }

}