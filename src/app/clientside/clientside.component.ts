import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-clientside',
  templateUrl: './clientside.component.html',
  styleUrls: ['./clientside.component.css']
})
export class ClientsideComponent implements OnInit {
  detailsData: any;
  userName: any;
  organationName;
  showSpinner: boolean = false;
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.showSpinner = true;

    this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/userdetails',
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      })
      .subscribe(data => {
        this.showSpinner = false;
        this.detailsData = data;
        console.log('detailData', this.detailsData);
        this.userName = this.detailsData.data.user_name;
        // this.organationName = this.detailsData.data.entid;
        this.httpClient.get<any>('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/enterprises')
          .subscribe(response => {
            response.body.data.filter(x => {
              if(x.entid === this.detailsData.data.entid) {
                this.organationName = x.entname;
              }
            });
            this.showSpinner = false;
          }, (error: any) => {
            console.log("error = " + error);

          });

        // alert("fro client side "+this.detailsData.data.userid)
        localStorage.setItem("userId", this.detailsData.data.userid);
        localStorage.setItem("enterpriseId", this.detailsData.data.entid);
        //this.showSpinner = false;
        //this.Edata = Array.of(this.Edata);
      }, (error: any) => {
        this.router.navigateByUrl('/');
        console.log("error = " + error);

      })


  }

  sessionStorage(): any {

    localStorage.removeItem("accessToken");
    //localStorage.removeItem("userId")


  }
}
