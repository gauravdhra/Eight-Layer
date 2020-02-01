import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-site-admin-side',
  templateUrl: './site-admin-side.component.html',
  styleUrls: ['./site-admin-side.component.css']
})
export class SiteAdminSideComponent implements OnInit {
  userName: any;
  //entId;
  detailsDataForSiteAdmin: any;
  organationName;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit() {

    this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/userdetails',
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      }).subscribe((data: any) => {


      this.detailsDataForSiteAdmin = data
      console.log("users details", this.detailsDataForSiteAdmin);
      this.userName = this.detailsDataForSiteAdmin.data.user_name
      localStorage.setItem("userId", this.detailsDataForSiteAdmin.data.userid);
      localStorage.setItem("enterpriseId", this.detailsDataForSiteAdmin.data.entid);

      this.httpClient.get<any>('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/enterprises')
        .subscribe(response => {
          response.body.data.filter(x => {
            if (x.entid === this.detailsDataForSiteAdmin.data.entid) {
              this.organationName = x.entname;
            }
          });
        });


        }, (error: any) => {
          this.router.navigateByUrl('/');
          console.log("error = " + error);

        })

    }
    sessionStorage()
  :
    any
    {

      localStorage.removeItem("accessToken");
      //localStorage.removeItem("userId")


    }

  }
