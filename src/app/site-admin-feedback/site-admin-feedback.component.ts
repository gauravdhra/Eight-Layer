import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-site-admin-feedback',
  templateUrl: './site-admin-feedback.component.html',
  styleUrls: ['./site-admin-feedback.component.css']
})
export class SiteAdminFeedbackComponent implements OnInit {
  feedbackName:any
  feedbackEmail:any
  feedbackContain:any
  showSpinner:boolean = false;
  isError:boolean = true;
  isSuccess:boolean = true;
  feedbackData:any

  constructor(private httpClient: HttpClient) { }


  userForm = new FormGroup({
    
    fullName: new FormGroup({
      
            //last_name: new FormControl("")
            feedback: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            
      
          }),

        email_id: new FormControl(null, [Validators.required, Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")]),
      
      })
      
  feedbackSubmit(){

   

    this.feedbackData = this.userForm.value
    console.log("this.feedbackData",this.feedbackData);
    this.feedbackName = this.feedbackData.name
    this.feedbackEmail = this.feedbackData.email_id
    this.feedbackContain = this.feedbackData.feedback

    
    console.log("this.feedbackData.feedback",this.feedbackData.feedback);
    console.log("this.feedbackContain",this.feedbackContain);
    console.log("name = "+this.feedbackName +" feedbackEmail = "+this.feedbackEmail +" feedbackContain"+this.feedbackContain);
this.showSpinner = true;
this.isSuccess = true;
this.httpClient.post(' https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/feedbacks', 
  JSON.stringify({
    feedback_name:this.feedbackName,
    comments:this.feedbackContain,
    email:this.feedbackEmail
    }),
  {
    headers:new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
  )}
).subscribe((data: any) => {

  this.userForm.get("fullName").get("name").setValue("");
  this.userForm.get("email_id").setValue("");
  this.userForm.get("fullName").get("feedback").setValue("");
  
  this.showSpinner = false;
  this.isSuccess = false;
  // document.getElementById("feedbackMessage").click();

}, (error: any) => {
  
  console.log("error of enterprise"+error);
  
})



//}

  }

  ngOnInit() {
  }

}
