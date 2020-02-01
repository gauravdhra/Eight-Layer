import { Component, OnInit, ElementRef } from '@angular/core';
import { ObjNgFor } from './myPipe';
import { Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EnterpriseDataService } from '../enterprise-data.service';
import { Router } from '@angular/router';


//import { PipeTransform, Pipe } from '@angular/core';

import 'rxjs/Rx'; 
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-client-enterprise',
  templateUrl: './client-enterprise.component.html',
  styleUrls: ['./client-enterprise.component.css'],
  providers:[EnterpriseDataService]

})
export class ClientEnterpriseComponent implements OnInit {
  
  //accessToken:string;
  public data: any
  display1='none';
  myIndex:any;
  Edatas:any = {}
 enterPriseText:any;
 errorMessage:any;
 newEntName:any;
  newQueValue:any;
 newstartDate:any;
 newEndDate:any;
 focusedLesson:any;
 activeUserCount:any;
 licenseCount:any;
 rate:any;
 maturityLevel:any;
 questionAmt:any;
 schedule:any;
 currentId:any;
 deleteId:any;
 editData:any;
 EName:any;
showSpinner:boolean = false;
message:string;
entDeleteName:any;
display='none';
enterpriseText:any;
no_of_question: any;
redClassBool:boolean = true;
childModal:boolean = false;
startDate:any
fromDate:any
toDate:any
 //Eid:any;

  constructor(private httpClient: HttpClient, private EnterpriseService: EnterpriseDataService, private router: Router, private eleRef: ElementRef) {}
//add
  newInputValue(entName, QueValue ):any
  {
     if(entName && QueValue){

      //this.childModal= true;
      this.display1 = "none";
      console.log("this.enterpriseText =",this.enterpriseText)
      this.showSpinner = true;
      console.log("myInpurValue = ", entName, "no_of_question = ", QueValue, "this.fromDate",this.fromDate, "this.toDate",this.toDate);
      //alert("token = "+sessionStorage.getItem("accessToken"));
       this.httpClient.post(
        'https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises',
        JSON.stringify({
          entname:entName,
          no_of_question: QueValue,
          start_date:this.fromDate,
          end_date:this.toDate,
          employee_settings: {
                "password_lower": true,
                "password_upper": true,
                "password_spl_char": true,
                "password_numbers": true,
                "custom_email_verification_message": "Your Verification Code is {####}.",
                "custom_email_verification_subject": "Email Verification"
              }
          }),
        {
          headers:new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
        )}
    ).subscribe((data: any) => {
        
        this.showSpinner = false;
        this.redClassBool = true;
       // this.enterpriseText = ""
        entName = "";
        this.ngOnInit();
        

      }, (error: any) => {

        console.log("error of enterprise"+error);
      })


     }else{

      //alert("Name is  mendatory")
      this.redClassBool = false;


     }
       
    
      }
//delete
      removeData():any{

       
       console.log(this.deleteId);
       this.showSpinner = true;
        this.httpClient.delete('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/' + this.deleteId,{

          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
        }).subscribe(
          result => {

            console.log(result)
            this.ngOnInit();
            this.showSpinner = false;
            
          },
          error => this.errorMessage = error
  ); 
      }
//edit
      edit(id:any){
        
                //alert("currentId = "+id);
                 this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/' + id,{
                  
                            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
                          }).subscribe(
                            result => {
                              this.editData = result;
                              console.log(this.editData.data.entname);
                              console.log('no_of_question',this.editData.data.no_of_question);
                              this.newEntName = this.editData.data.entname;
                              this.newQueValue = this.editData.data.no_of_question;
                             // alert("this.newEntName = "+this.newEntName);
                              this.newstartDate = this.editData.data.end_date;
                              this.newEndDate = this.editData.data.start_date;
                               this.currentId = this.editData.data.entid;
                              console.log("currentId in edit", this.currentId);
                              // this.activeUserCount = this.editData.data.license.activeusercount;
                              // this.licenseCount = this.editData.data.license.licensecount;
                              // console.log("this.activeUserCount = "+this.activeUserCount+" "+"this.licenseCount  = "+this.licenseCount)
                              // this.rate = this.editData.data.license.Rate;
                              // this.maturityLevel = this.editData.data.attributes.maturity_level;
                              
                              // console.log("this.maturityLeve = "+this.maturityLevel+" "+"this.rate = "+this.rate)
                              // this.focusedLesson = this.editData.data.config[0].focusedLesson;
                              // this.questionAmt =this.editData.data.config[0].questionAmt;
                              // this.schedule = this.editData.data.config[0].schedule;        
                              this.ngOnInit();
                              
                            }),
                            error => this.errorMessage = error
                
              }
//get Delete Id
              getDeleteId(getId:any, DeleteName:any){

                this.deleteId = getId
                this.entDeleteName = DeleteName
              }
    //update          
    updateData(){

     // alert("final this.newEntName = "+this.newEntName)
      this.showSpinner = true;
      console.log(this.currentId)
       this.httpClient.put(
        'https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/'+this.currentId, 
        JSON.stringify({
          entname : this.newEntName,
          no_of_question: this.newQueValue,
          license: {
              "activeusercount": this.activeUserCount,
              "licensecount": this.licenseCount,
              "Rate": this.rate
          },
          "attributes": {
              "maturity_level": this.maturityLevel,
              "entname": this.newEntName,
          },
          "config": [
              {
                  "focusedLesson": this.focusedLesson,
                  "schedule": this.schedule,
                  "questionAmt": this.questionAmt
              }
          ],
          "start_date": this.newstartDate,
          "end_date": this.newEndDate
          }),
        {
          headers:new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
        )}
    ).subscribe((data: any) => {
        
        console.log("data of put"+data);
        this.ngOnInit();
        this.showSpinner = false;

      }, (error: any) => {

        console.log("error of put"+error);
      })

    }
    //get UsersID
    usersId(EName:string,entid:any, ind:any){
      
              //this.EnterpriseService.insertData(EName);
             // this.currentInd = "2";
              this.data = entid;
              this.myIndex = ind
              //sending the name
              this.EnterpriseService.changeMessage(EName);
          
        }
  listFun(finalId:any){

//alert("finalId = "+finalId);
if(finalId){

  this.router.navigate(['client/listuser', finalId]);
  
  
}else{

//alert("Please Select Any Enterprise");
this.display='block';

}

          
        }
        onCloseHandled(){

          this.display='none';

        }
       
      
  ngOnInit() {


    //this.EnterpriseService.currentMessage.subscribe(message => this.message = message);
   
    //alert(this.message);
    //console.log("token = "+sessionStorage.getItem("accessToken"));
    
    this.showSpinner = true;
    this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/',
    {
      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    })
    .subscribe(data => {
      console.log("enterprise Date" , data);
      this.Edatas = data
      console.log("length",this.Edatas.data.length);
      console.log("this.Edatas" , this.Edatas);
      this.showSpinner = false;
      //this.Edata = Array.of(this.Edata);
    }, (error: any) => {
      this.router.navigateByUrl('/');
      console.log("error = " + error);

    })
  
    this.startDate = new Date('2005/02/02');
  }
  /*date picker*/
  set humanDate(e){
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1]-1, e[2]));
    this.startDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
  }
  
  get humanDate(){
    return this.startDate.toISOString().substring(0, 10);
  }
  ent(){
    
              //alert("asdasdsad");
              this.display1='block';
    
            }
            entClose(){

              this.display1='none';

            }
}
