import { Component, OnInit } from '@angular/core';
//import { Customer } from './customer.interface';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-questiontype2',
  templateUrl: './questiontype2.component.html',
  styleUrls: ['./questiontype2.component.css']
})
export class Questiontype2Component implements OnInit {
  public myForm: FormGroup;
  selectTypes:any;
  public id: any;
  private sub: any;
  items = [];
  answerIndex = [];
  answers = {}
  finalAnswer:any;
  incrementIndex:any;
  showSpinner:boolean = false;
  questionId:any
  submittedAnswer:any;
  currentType:any;
  answer;
  queValue;
  validationOfQuestion;

  constructor(private _fb: FormBuilder, private route: ActivatedRoute,private httpClient: HttpClient,private router: Router) {

        this.myForm = new FormGroup({
          // email: new Control(self.email),
          // password: new Control("")
      });
      }

  ngOnInit() {
    this.currentType = 2;
    this.myForm = this._fb.group({
      question: [''],
      inspired_by: [''],
      question_insights: [''],
      //question_type: [''],
      question_level: [''],
    //   question_options: this._fb.group([
    //     this.initAddress(),
    // ])
    question_options_array: this._fb.array([
          this.initAddress(),
      ]),
      question_options: this._fb.group([
        this.initAddress(),
    ])
  });

  }

  addAddress() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['question_options_array'];
    control.push(this.initAddress());
  }
  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['question_options_array'];
    control.removeAt(i);
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
      saveQuestion(formData:any){
      //  alert("save Question")
          this.showSpinner = true;

        for(let i = 0; i < formData.question_options_array.length; i++){
        console.log(formData.question_options_array[i]);
        console.log(formData.question_options[i]);
        formData.question_options[i] = formData.question_options_array[i]

        }

        this.sub = this.route.params.subscribe(params => {
          this.id = params['lId'];
        // alert("id = "+this.id);

        });
        formData.question_type = this.selectTypes;
        console.log("question_type2 = " , formData);
         this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/'+this.id+'/questions',
            formData,
          {
            headers:new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )}
        ).subscribe((data: any) => {

          this.showSpinner = false;
          //alert("error of enterprise = "+data.question_code);
          this.questionId = data.question_code;
         // alert("this.questionId = "+this.questionId);
          this.ngOnInit();
          this.addAnswers();

        }, (error: any) => {

          //alert("error of enterprise = "+error.message);
          this.showSpinner = false;
        })
        }
        addAnswers(){
          this.answers[this.incrementIndex]  = this.submittedAnswer
          console.log(this.answers)
          let final = {};

          final = this.answers;
          this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/'+this.id+'/questions/'+this.questionId+'/answers',
          JSON.stringify({
              "answer": final
            }),
          {
            headers:new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )}
        ).subscribe((data: any) => {

          console.log("data of answer ="+data);

          this.showSpinner = false;

        }, (error: any) => {

          console.log("error of answer ="+error);
          this.showSpinner = false;
        })
        //alert(this.incrementIndex+" "+this.submittedAnswer)

        }
        getAnswer(answer:any,answerInd:any){

               this.submittedAnswer = answer;
               this.finalAnswer = +answerInd
               this.incrementIndex = this.finalAnswer;

              this.items.push(answer);
              this.answerIndex.push(this.incrementIndex)

              this.answers[this.incrementIndex]  = answer
             // console.log(this.answers);

            }
  initAddress() {
    // initialize our address
    return this._fb.group({
      name: ['']
    });
}

  onQuestionView() {
    document.getElementById("questionViewPopup").classList.add("in");
    this.answer  = <FormArray>this.myForm.controls['question_options_array'];
    this.queValue = this.answer.value;
  }
  closeDialog() {
    document.getElementById("questionViewPopup").classList.remove("in");
  }
}
