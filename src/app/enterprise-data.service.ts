import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class EnterpriseDataService {

  private messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();

  //dataArray: string[] = [];
  constructor() {  }
      changeMessage(message: string){

        //alert("service message ="+message);
        this.messageSource.next(message);
          //this.dataArray.unshift(data);
      }

  


}
