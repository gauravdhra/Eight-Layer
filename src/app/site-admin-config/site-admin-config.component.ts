import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ObjNgFor } from '../client-enterprise/myPipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-site-admin-config',
  templateUrl: './site-admin-config.component.html',
  styleUrls: ['./site-admin-config.component.css']

})
export class SiteAdminConfigComponent implements OnInit {

  entId: any;
  usersName: any;
  usersGmailId: any;
  chapterDataforConfig: any
  csv1 = {}
  date: any
  month: any;
  currentYear: any
  myVariable: any;
  questionAmount: any
  focusCount: any;
  userRoleData:any;
  errorMessage:any;
  myUserId:any;
  isError:boolean = true;
  blankFiels = true;
  nameFiels = true;
  successFiels:boolean = true;
  WrongFields:boolean = true
  ErrorFiels:boolean = true;
  isUser: boolean = true
  currentCsvName:any
  fileData:any
  public showSpinner: boolean = false;

  constructor(private httpClient: HttpClient,private router: Router) {

    this.date = (new Date()).getFullYear()

  }

  currentChapterFocus(focus) {

    this.focusCount = focus

  }
  /*save*/
  schedulLessons() {

    this.showSpinner = true;
    console.log("this.myVariable = "+this.myVariable+" this.month = "+this.month +" this.questionAmount = "+ this.questionAmount)
    if (this.myVariable && this.month && this.questionAmount)
     {
     
      this.blankFiels = true
      //this.successFiels = true
      if (this.month <= 10) {

        this.currentYear = this.date + "-" + "0" + this.month + "-" + "01"

      } else {
        this.currentYear = this.date + "-" + "0" + this.month + "-" + "01"
      }
     
      this.entId = localStorage.getItem("enterpriseId");
      console.log("date = " + this.currentYear + "chapter_code" + this.myVariable + "question_amount" + this.questionAmount + "focusCount" + this.focusCount + "entid = " + this.entId);

      this.httpClient.post('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/schedules/lessons/' + this.entId,
        JSON.stringify({
          chapter_code: this.myVariable,
          question_amount: this.questionAmount,
          scheduled_date: this.currentYear

        }),
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )
        }
      ).subscribe((data: any) => {
        console.log(data);
        this.showSpinner = false;
        //this.successFiels = false;
        alert("Lesson has been scheduled successfully");

        /* Question scheduling */
        console.log([this.myVariable]);
        this.httpClient.post('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/schedules/quizzes/' + this.entId,
          JSON.stringify({
            lessons_included: [this.myVariable],
            quiz_status: "1",
            scheduled_date: this.currentYear

          }),
          {
            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
            )
          }
        ).subscribe((data: any) => {
          console.log("Question sceduling success")
          console.log(data);
          this.showSpinner = false;
   

        }, (error: any) => {

          console.log("error of enterprise" + error);
        })

        this.showSpinner = false;
        

      }, (error: any) => {

        console.log("error of enterprise" + error);
      })

    } else {

      this.showSpinner = false;
      this.blankFiels = false;
      //this.successFiels = true
      //alert("fill all the fields");
      

    }
  }

  selectQuestionChapter(qChapter: any) {
    console.log("qChapter", qChapter)
    this.myVariable = qChapter
    console.log("QuestionChapter = " + qChapter);
    console.log("this.myVariable", this.myVariable);
  }
  selectQuestionAmount(qAmount) {

    console.log("qAmount = " + qAmount);
    this.questionAmount = qAmount

  }
  selectQuestionSchedule(qscheduling) {

    console.log("qscheduling", qscheduling)
    this.month = qscheduling

  }




  /*bulk user code*/

  fileChangeListener($event) {
    this.successFiels = true;
    this.WrongFields = true;
    const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
  this.fileData = files[0];
    

if(file.name){

  console.log("csvName = ",file.name);
  this.currentCsvName  = file.name
document.getElementById("CsvName").setAttribute("style", "display: block");
}
    
  }
  csvSubmit(){

console.log("csv is submitted")
   var formData = new FormData();
   formData.set('file', this.fileData);

    const headers = new Headers({});
    let options = new RequestOptions({ headers });
    let url = 'https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/enterprises/'+this.entId+'/bulkupload/users'

    this.httpClient.post(url, formData, {

      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))

    }).subscribe(res => {

      console.log(res);
    this.successFiels = false;
    this.WrongFields = true
     // alert("Users added successfully");

    }, (error: any) => {
      
              this.showSpinner = false;
               this.WrongFields = false;
               this.successFiels = true;
              console.log("error of enterprise" + error);
      
            });


  }
  /*single  user*/
  Adduser(name, email) {
    
    this.nameFiels = true
    this.entId = localStorage.getItem("enterpriseId");
    if (name) {
     this.showSpinner = true;
     let data = {
       role:'Examinee',
       email:email,
       name:name,
       entid:this.entId,
     };

      this.httpClient.post(
        'https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/enterprises/createuser',
        data,
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )
        }
      ).subscribe((data: any) => {


     
        this.showSpinner = false;
        this.isUser = false
       // alert("user add successfully");
        this.usersName = ""
        this.usersGmailId = ""

      }, (error: any) => {

        this.showSpinner = false;
        console.log("error of enterprise", error);

      })

    } else {


      this.nameFiels = false
    }
  }

  selectUserValue(value){
    this.myUserId = value
   console.log("this.myUserId = ",this.myUserId);

  }
  roleAssign(){

    if(this.myUserId){
      this.showSpinner = true;
      this.isError = true;
      this.entId = localStorage.getItem("enterpriseId");
      this.httpClient.put('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/role/'+this.entId+'/users/'+this.myUserId, 
        JSON.stringify({
          "role_name":"Site Admin"
          }),
        {
          headers:new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
        )}
    ).subscribe((data: any) => {
      this.showSpinner = false;
        alert(data.message);
        this.ngOnInit();
      }, (error: any) => {

        this.showSpinner = false;
        console.log("error of put = "+error);
      })

    }else{

      this.showSpinner = false;
      this.isError = false;
      //alert("select something");
    }
   

  }

  ngOnInit() {
    document.getElementById("UserManagementTab").click()
    this.showSpinner = true;
    this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters',
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      }).subscribe((data: any) => {
        
        this.chapterDataforConfig = data
        
         console.log("chapter data" , this.chapterDataforConfig);
         this.showSpinner = false;
  
      }, (error: any) => {
  
        console.log("error of put = "+error);
      })
      this.entId = localStorage.getItem("enterpriseId");
      
      this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/'+this.entId+'/users/',{
        
                  headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
                }).subscribe(
                  getUser => {
                    this.userRoleData = getUser
                    console.log("this.userRoleData====>",this.userRoleData);
                    this.showSpinner = false;
                  }),
                  error => this.errorMessage = error

  }

}
