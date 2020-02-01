import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ObjNgFor } from '../client-enterprise/myPipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-admin-home',
  templateUrl: './site-admin-home.component.html',
  styleUrls: ['./site-admin-home.component.css']
})
export class SiteAdminHomeComponent implements OnInit {
  public showSpinner: boolean = false;
  graphData:any
  entId:any
  data1 = [];
  data2 = [];
  public lineChartData:Array<any> = [
    {data: [], label: 'Trend'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [

    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: "white",//'rgba(148,159,177,1.45)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }
  constructor(private httpClient: HttpClient,private router: Router) { }

  ngOnInit() {
    this.showSpinner = true
    this.entId = localStorage.getItem("enterpriseId");
    this.httpClient.get("https://dn8vci2oq6.execute-api.us-east-1.amazonaws.com/dev/reports/"+this.entId+"/graphreport",
    {
      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    }).subscribe((data: any) => {

      this.graphData = data

       console.log("graphData data" , this.graphData);
       this.showSpinner = false;

      for (var property in this.graphData.data.monthlyreport) {

      this.data1.push(property);
      this.data2.push(this.graphData.data.monthlyreport[property]);

   }
   console.log("data1",this.data1)

   console.log("data2",this.data2)
   this.lineChartData[0].data=this.data2;
   this.lineChartLabels=this.data1;
    }, (error: any) => {
      this.showSpinner = false;
      console.log("error of put = ",error);
    })

  }

}
