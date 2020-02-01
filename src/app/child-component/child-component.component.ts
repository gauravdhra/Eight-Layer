import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {


  finalData:any
  enterpriseCount:any;
  showSpinner:boolean = false;
  userName:any;
  detailsData: any =[];
  organationName;

  constructor(private httpClient: HttpClient,private router: Router) { }

  sessionStorage():any{

      localStorage.removeItem("accessToken");
      localStorage.removeItem("loginUser");
      this.router.navigateByUrl('/');
     }


  ngOnInit() {

    console.log("child component is calling");
    this.showSpinner = true;
    this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/userdetails',
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      })
      .subscribe(data => {
        this.detailsData = data;
        localStorage.setItem("userId", this.detailsData.data.userid);
        localStorage.setItem("enterpriseId", this.detailsData.data.entid);
        /*this.httpClient.get<any>('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/enterprises')
          .subscribe(response => {
            response.body.data.filter(x => {
              if (x.entid === this.detailsData.data.entid) {
                this.organationName = x.entname;
              }
            });
          });*/
      });
    this.httpClient.get<any>('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/',
    {
      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    })
    .subscribe((res) => {
   console.log("data = ",res);
     this.finalData = res
     this.enterpriseCount = this.finalData.data.length;
        res.data.filter(x => {
          if (x.entid === this.detailsData.data.entid) {
            this.organationName = x.entname;
          }
        });
     this.userName =  localStorage.getItem("loginUser");//this.finalData.data[0].entname
    
    console.log(this.userName);
      this.showSpinner = false;
    }, 
    (error: any) => {
    // this.router.navigateByUrl('/');
     console.log("error = " + error);
   
   })

  }

}
