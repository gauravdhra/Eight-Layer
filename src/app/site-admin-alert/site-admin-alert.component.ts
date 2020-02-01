import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObjNgFor } from '../client-enterprise/myPipe';

@Component({
  selector: 'app-site-admin-alert',
  templateUrl: './site-admin-alert.component.html',
  styleUrls: ['./site-admin-alert.component.css']
})
export class SiteAdminAlertComponent implements OnInit {
nonComplaintUser:any;
entId:any;
public showSpinner:boolean = false;
errorMessage:any;

  constructor(private httpClient: HttpClient,private router: Router) { }

  ngOnInit() {

    this.showSpinner = true;
    this.entId = localStorage.getItem("enterpriseId");
    this.httpClient.get('https://dn8vci2oq6.execute-api.us-east-1.amazonaws.com/dev/reports/' + this.entId + '/users/noncompliant/monthly',{

                headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
              }).subscribe(data => {
                this.nonComplaintUser = data;
                alert("userData" + this.nonComplaintUser.data);
                console.log("nonComplaintUser.data length",this.nonComplaintUser.data.length);
                console.log("complaint users",this.nonComplaintUser);
                this.showSpinner = false;
              }, (error: any) => {
                this.nonComplaintUser = 0;''
                this.showSpinner = false;
                // this.router.navigateByUrl('/');
                console.log("error = " + error.message);

              })


  }



}
