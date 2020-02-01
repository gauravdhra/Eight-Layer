import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {

 finalData:any
 enterpriseCount:any;
 showSpinner:boolean = false;
 userName:any;

constructor(private httpClient: HttpClient,private router: Router) { }
 
  ngOnInit() {  

 this.showSpinner = true;
 this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/',
 {
   headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
 })
 .subscribe(data => {

  this.finalData = data
  this.enterpriseCount = this.finalData.data.length
 this.userName =  this.finalData.data.entname
 
 console.log(this.userName);
   this.showSpinner = false;
  
 }, (error: any) => {
  //this.router.navigateByUrl('/');
  console.log("errorsdfsdfsdfdsf = " + error);

})
  }
}
