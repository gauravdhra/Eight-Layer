import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {FileService} from '../file.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-questiontype3',
  templateUrl: './questiontype3.component.html',
  styleUrls: ['./questiontype3.component.css']
})
export class Questiontype3Component implements OnInit {
  selectTypes:any;
  public id: any;
  private sub: any;
  myQuestion:any
  myInspiredBy:any;
  myQuestionLevel:any;
  myExplaination:any;
  type3QuestionID:any;
  display='none';
  //selectTypesForQuestion:any
  accessToken:any;
  IncrementCount = 0;
  showSpinner:boolean = false;
  constructor(private router: Router,private route: ActivatedRoute,private fileService: FileService,private httpClient: HttpClient) { }

  ngOnInit() {
  }
  saveMyQuestion(){

    this.display='block'; 
    this.sub = this.route.params.subscribe(params => {
      this.id = params['lId'];
     //alert("id = "+this.id);
    
    });
    this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/'+this.id+'/questions', 
    JSON.stringify({
      question:this.myQuestion,
      question_options: {
    },
    inspired_by: this.myInspiredBy,
    question_type: "3",
    question_level: this.myQuestionLevel,
    question_insights:this.myExplaination
      }),  
  {
    headers:new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
  )}
).subscribe((data: any) => {
  
  this.showSpinner = false;
  //alert("error of enterprise = "+data.question_code);
  this.type3QuestionID = data.question_code;
  this.accessToken =  localStorage.getItem("accessToken")
  //alert("this.type3QuestionID = "+this.type3QuestionID);
  //this.ngOnInit();
  //this.addAnswers();

}, (error: any) => {

  alert("error of enterprise = "+error.message);
  this.showSpinner = false;
})

    //console.log("question = "+this.myQuestion+"inspired by = "+this.myInspiredBy+"myQuestionLevel = "+this.myQuestionLevel+"myExplaination = "+this.myExplaination);
    //alert(this.selectTypesForQuestion)
    console.log("current accessToken ="+ localStorage.getItem("accessToken"))
    //this.type3QuestionID = "fg544654gf6df4ghdf4gh4"
  }
  // selectchangeforQuestion(args){

  //   this.selectTypesForQuestion = args

  // }
  onUploadFinished(args){

    //alert("before upload");
    //alert("sadfsadfsdf");
    
    this.IncrementCount = this.IncrementCount + 1;
   // alert("count = "+this.IncrementCount);

  }
  selectchangeforType(args){
    
    this.selectTypes = args
    
   // alert("current Typeddddddddddd = "+this.selectTypes);
    this.sub = this.route.params.subscribe(params => {
      this.id = params['lId'];
     //alert("id = "+this.id);
    
    });
    if(this.selectTypes  == "1" ) {
          
                // this.router.navigate(['lessons/chapter/type1', chepId]);
                this.router.navigate(['type1', this.id]);
          
                //this.router.navigate(['client/listuser', finalId]);
          
              } else if ( this.selectTypes  == "2"){
          
                this.router.navigate(['type2', this.id]);
              //  alert("this is type 2");
                
              } else{
          
                // alert("in 1 and 2 = "+chepId);
               // alert("this is type 3")
                this.router.navigate(['type3', this.id]);
          
              }
        
      }

}
