import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {NotificationService} from "../services/notification.service";
declare var notification: any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  // hideVar:boolean
  entId;
   constructor(private httpClient:HttpClient,
               private notificationService: NotificationService){


   }
   sessionStorage():any{

      //alert("asdadsaasdadasdasda");
      sessionStorage.removeItem("accessToken");
     }


  ngOnInit() {
    new notification();
    this.entId = localStorage.getItem("Orgnisation_id");
    this.notificationService.getQuizSchedule(this.entId).subscribe(data => {
      console.log('Quiz status', data);
      if(data) {
        if (data.body.data.length !== 0) {
          new notification('Quiz Notification', "There is a quiz prepared and ready for you." +
            "Take 5 Minutes and complete the session." +
            "Do you want to take it now?");
        }
      }
    });
    console.log('login page');
  }
    //console.log("app.component is calling");
    // this.hideVar = true;

  }
