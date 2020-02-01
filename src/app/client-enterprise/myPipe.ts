//  import { PipeTransform, Pipe } from '@angular/core';
// // alert("pipe file is calling");
// @Pipe({ name: 'keys',  pure: false })
// export class KeysPipe implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value)//.map(key => value[key]);
//     }
// }
import {Pipe,PipeTransform} from '@angular/core';

@Pipe({ name: 'ObjNgFor', pure: false })
export class ObjNgFor implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value).map(key => Object.assign({ key }, value[key]));
    }
 }   